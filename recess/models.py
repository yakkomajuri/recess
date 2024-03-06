from django.db import models
from uuid import uuid4
import datetime
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    feeds_following = models.ManyToManyField('Feed', related_name='feeds_following', blank=True)
    posts_liked = models.ManyToManyField('Post', related_name='liked_posts', blank=True)
    bio = models.CharField(max_length=500, blank=True, null=True)

    
# content hash? posts? raw feed?
class Feed(models.Model):
    feed_uuid = models.UUIDField(
        primary_key = True, 
        default = uuid4, 
        editable = False,
    )
    feed_url = models.URLField(unique=True)
    feed_name = models.CharField(max_length=200)
    feed_follower_count = models.IntegerField(default = 0)
    
    # this is when we last fetched the data and updated the feed
    feed_last_updated = models.DateTimeField(default=datetime.datetime.now) 
    
    # this is when the feed was last published according to its metadata
    feed_last_publish = models.DateTimeField(default=datetime.datetime.now)
    
    feed_picture_url = models.URLField(null=True, blank=True)
    feed_description = models.CharField(max_length=1000)
    feed_original_importer = models.ForeignKey(User, related_name='imported_feeds', on_delete=models.CASCADE, blank=True, null=True)
    feed_owner = models.ForeignKey(User, related_name='owned_feeds', on_delete=models.CASCADE, blank=True, null=True)

class Post(models.Model):
    post_uuid = models.UUIDField(
        primary_key = True, 
        default = uuid4, 
        editable = False,
    )
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    post_url = models.URLField()
    post_name = models.CharField(max_length=200)
    post_description = models.CharField(max_length=500)
    post_published_date = models.DateTimeField()
    post_like_count = models.PositiveIntegerField(default = 0)
    post_comment_count = models.PositiveIntegerField(default = 0)
    
class PostComment(models.Model):
    comment_uuid = models.UUIDField(
        primary_key = True, 
        default = uuid4, 
        editable = False,
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment_author = models.ForeignKey(User, related_name='users_with_comments', on_delete=models.CASCADE)
    comment_content = models.CharField(max_length=1000)
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)
    comment_timestamp = models.DateTimeField(default=datetime.datetime.now)

