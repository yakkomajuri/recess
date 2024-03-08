from rest_framework import serializers, viewsets, response
from recess.models import Feed, Post
import feedparser
from uuid import uuid4
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
import requests
from email.utils import parsedate_to_datetime
from recess.feed_utils import parse_date, tz_aware_datetime


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
        ]
        read_only_fields = [
            "feed_uuid",
            "feed_name",
            "feed_follower_count",
            "feed_picture_url",
            "feed_last_updated",
            "feed_description",
        ]

    def create(self, validated_data):
        feed_uuid = uuid4()
        rss_feed = feedparser.parse(validated_data["feed_url"])
        feed_name = rss_feed.feed.title  # this needs error handling
        feed_description = rss_feed.feed.description  # this needs error handling
        feed_picture_url = ""
        feed_last_publish = (
            tz_aware_datetime(parsedate_to_datetime(rss_feed.feed.updated))
            if rss_feed.feed.updated is not None
            else None
        )

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
        }

        res = super().create(feed_data)

        for entry in rss_feed.entries:
            post_published_date = parse_date(entry)

            # we're currently skipping posts we can't get a date for
            # is this the best approach?
            if post_published_date is None:
                continue

            Post.objects.create(
                feed=Feed.objects.get(feed_uuid=feed_uuid),
                post_url=entry["link"],
                post_name=entry["title"],
                post_published_date=post_published_date,
                post_description=entry["summary"],
            )
        return res


class FeedViewset(viewsets.ModelViewSet):
    queryset = Feed.objects.all().order_by("feed_uuid")
    serializer_class = FeedSerializer

    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def trending(self, request):
        trending_feeds = Feed.objects.order_by("-feed_follower_count")[:5]
        serializer = self.get_serializer(trending_feeds, many=True)
        return response.Response(serializer.data)
