from django.contrib import admin
from .models import User, Feed, Post, PostComment, EmailOptOut
from django.urls import reverse
from django.utils.html import format_html
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'feeds_following_count')
    
    def feeds_following_count(self, obj):
        return obj.feeds_following.count()
    feeds_following_count.short_description = 'Feeds Following'


class FeedAdmin(admin.ModelAdmin):
    list_display = ('feed_name', 'feed_url', 'feed_publisher_email', 'feed_uuid')


class PostAdmin(admin.ModelAdmin):
    list_display = ('post_name', 'post_published_date', 'feed_name', 'post_uuid')
    
    def feed_name(self, obj):
        url = reverse('admin:recess_feed_change', args=[obj.feed.pk])  # Create the admin URL for the related User object
        return format_html('<a href="{}">{}</a>', url, obj.feed.feed_name)
    
    feed_name.short_description = 'Feed'



class PostCommentAdmin(admin.ModelAdmin):
    pass

class EmailOptOutAdmin(admin.ModelAdmin):
    list_display = ('email', 'opted_out')


admin.site.register(User, CustomUserAdmin)
admin.site.register(Feed, FeedAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(PostComment, PostCommentAdmin)
admin.site.register(EmailOptOut, EmailOptOutAdmin)