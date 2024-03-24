from rest_framework import serializers, viewsets, response
from recess.models import Feed, Post, User, EmailVerificationStatus
import feedparser
from uuid import uuid4
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
import requests
from recess.utils.feed_utils import parse_date, tz_aware_datetime
from rest_framework.exceptions import ValidationError
from django.utils import timezone

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = [
            "feed_uuid",
            "feed_url",
            "feed_name",
            "feed_follower_count",
            "feed_picture_url",
            "feed_last_updated",
            "feed_description",
            "feed_publisher_email",
            "hide_from_discovery"
        ]
        read_only_fields = [
            "feed_uuid",
            "feed_name",
            "feed_follower_count",
            "feed_picture_url",
            "feed_last_updated",
            "feed_description",
            "feed_publisher_email",
            "hide_from_discovery"
        ]

    def _user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        
    def create(self, validated_data):
        feed_uuid = uuid4()
        
        rss_feed = feedparser.parse(validated_data["feed_url"])
        
        try:
            feed_name = rss_feed.feed.title
        except Exception:
            raise ValidationError({'errors': ["Feed URL isn't a  valid RSS feed or is formatted incorrectly."]})
        
        feed_description = rss_feed.feed.get('description', '')
        feed_picture_url = ""
        feed_last_publish = (
            tz_aware_datetime(parse_date(rss_feed.feed.updated))
            if rss_feed.feed.get('updated', None) is not None
            else timezone.now()
        )
        
        feed_publisher_email = None
        
        if hasattr(rss_feed.feed, 'publisher_detail') and hasattr(rss_feed.feed.publisher_detail, 'email'):
            feed_publisher_email = rss_feed.feed.publisher_detail.email
            
        feed_owner = None
        
        if feed_publisher_email is not None:
            user_queryset = User.objects.filter(email=feed_publisher_email, email_verification_status=EmailVerificationStatus.Verified)
            if len(user_queryset) > 0:
                feed_owner = user_queryset[0]

        if hasattr(rss_feed.feed, "image") and hasattr(rss_feed.feed.image, "href"):
            feed_picture_url = rss_feed.feed.image.href
        elif hasattr(rss_feed.feed, "author") and hasattr(rss_feed.feed.author, "logo"):
            feed_picture_url = rss_feed.author.logo
        elif hasattr(rss_feed.feed, "link"):
            res = requests.get(rss_feed.feed.link + "/favicon.ico")
            if res.status_code == 200:
                feed_picture_url = rss_feed.feed.link + "/favicon.ico"

        feed_data = {
            **validated_data,
            "feed_uuid": feed_uuid,
            "feed_name": feed_name,
            "feed_description": feed_description,
            "feed_picture_url": feed_picture_url,
            "feed_last_publish": feed_last_publish,
            "feed_original_importer": self._user(),
            "feed_publisher_email": feed_publisher_email,
            "feed_owner": feed_owner
        }

        res = super().create(feed_data)

        for entry in rss_feed.entries:
            post_published_date = parse_date(entry.get('published') or entry.get('pubDate') or entry.get('updated'))

            # we're currently skipping posts we can't get a date for
            # is this the best approach?
            if post_published_date is None:
                continue
            try:
                Post.objects.create(
                    feed=Feed.objects.get(feed_uuid=feed_uuid),
                    post_url=entry["link"],
                    post_name=entry["title"],
                    post_published_date=post_published_date,
                    post_description=entry["summary"],
                )
            except:
                # This is to prevent us from telling the user that the feed wasn't imported because a post failed
                # Although we should provide some feedback about not being able to import some posts
                pass
        return res


class FeedViewset(viewsets.ModelViewSet):
    queryset = Feed.objects.all().order_by("feed_uuid")
    serializer_class = FeedSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'trending', 'search']:
            return [AllowAny()]
        elif self.action in ['create']:
            return [IsAuthenticated()]
        return [IsAdminUser()]
    
    @action(detail=False, methods=["get"])
    def trending(self, request):
        trending_feeds = Feed.objects.filter(hide_from_discovery=False).order_by("-feed_follower_count")[:5]
        serializer = self.get_serializer(trending_feeds, many=True)
        return response.Response(serializer.data)
    
    @action(detail=False, methods=["get"])
    def search(self, request):
        search_param = request.query_params.get("search")
        if search_param:
            feeds = Feed.objects.filter(feed_name__icontains=search_param).order_by("-feed_follower_count")[:5]
            serializer = self.get_serializer(feeds, many=True)
            return response.Response(serializer.data)
        else:
            return response.Response([])