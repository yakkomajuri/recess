from rest_framework import serializers, viewsets, response
from backend.models import Feed, Post
import feedparser
from uuid import uuid4
from email.utils import parsedate_to_datetime
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
import html
import requests
import datetime



# extract this later and consider all possibilities
def parse_date(entry):
    try:
        return parsedate_to_datetime(entry['published'] or entry['pubDate'])
    except Exception:
        pass
    
    try:
        return datetime.datetime.fromisoformat(entry['published'] or entry['pubDate'])
    except Exception as e:
        print(e)
        pass
    

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ["feed_uuid", "feed_url", "feed_name", "feed_follower_count", "feed_picture_url", "feed_last_updated", "feed_description"]
        read_only_fields = ["feed_uuid", "feed_name", "feed_follower_count", "feed_picture_url", "feed_last_updated", "feed_description"] 


    def create(self, validated_data):
        feed_uuid = uuid4()
        rss_feed = feedparser.parse(validated_data['feed_url'])
        feed_name = rss_feed.feed.title # this needs error handling
        feed_description = rss_feed.feed.description # this needs error handling
        feed_picture_url = ''
        if hasattr(rss_feed.feed, 'image') and hasattr(rss_feed.feed.image, 'href'):
            feed_picture_url = rss_feed.feed.image.href 
        elif hasattr(rss_feed.feed, 'author') and hasattr(rss_feed.feed.author, 'logo'):
            feed_picture_url = rss_feed.author.logo 
        elif hasattr(rss_feed.feed, 'link'):
            res = requests.get(rss_feed.feed.link + '/favicon.ico')
            if res.status_code == 200:
                feed_picture_url = rss_feed.feed.link + '/favicon.ico'
        
        res = super().create( { **validated_data, **{ "feed_uuid": feed_uuid, "feed_name": feed_name, "feed_description": feed_description, "feed_picture_url": feed_picture_url }})
        for entry in rss_feed.entries:
            try:
                post_published_date = parse_date(entry)
            except Exception:
                return response.Response(status=417, data={ "detail": "Invalid date on posts"})
            Post.objects.create(
                feed = Feed.objects.get(feed_uuid=feed_uuid),
                post_url = entry['link'],
                post_name = entry['title'],
                post_published_date = post_published_date,
                post_description = entry['summary']
            ) 
        return res
    

class FeedViewset(viewsets.ModelViewSet):
    queryset = Feed.objects.all().order_by("feed_uuid")
    serializer_class = FeedSerializer

    def get_permissions(self):
        return [IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def trending(self, request):
        trending_feeds = Feed.objects.order_by('-feed_follower_count')[:5]
        serializer = self.get_serializer(trending_feeds, many=True)
        return response.Response(serializer.data)
