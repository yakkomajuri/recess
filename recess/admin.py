from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Feed, Post, PostComment

class FeedAdmin(admin.ModelAdmin):
    pass

class PostAdmin(admin.ModelAdmin):
    pass

class PostCommentAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(Feed, FeedAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(PostComment, PostCommentAdmin)