import html
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from recess.models import Post, PostComment
from rest_framework.decorators import action
from recess.api.api_utils import get_paginated_queryset
from recess.settings import DEFAULT_PAGE_SIZE


def _add_user_metadata_to_posts(posts, user):
    for post in posts:
        post["liked_by_user"] = user.posts_liked.filter(post_uuid=post["post_uuid"]).exists()
    return posts
    

class PostSerializer(serializers.ModelSerializer):
    feed_uuid = serializers.SerializerMethodField()
    feed_name = serializers.SerializerMethodField()
    feed_picture_url = serializers.SerializerMethodField()
    post_description = serializers.SerializerMethodField()
    post_name = serializers.SerializerMethodField()
    liked_by_user = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ["post_uuid", "feed", "post_url", "post_name", "post_description", "post_published_date", "feed_uuid", "feed_name", "feed_picture_url", "post_like_count", "post_comment_count", "liked_by_user"]
        read_only_fields = ["post_uuid", "feed", "post_url", "post_name", "post_description", "post_published_date", "feed_uuid", "feed_name", "feed_picture_url", "post_like_count", "post_comment_count", "liked_by_user"]

    def get_feed_uuid(self, obj):
        return obj.feed.feed_uuid

    def get_feed_name(self, obj):
        return html.unescape(obj.feed.feed_name)

    def get_feed_picture_url(self, obj):
        return obj.feed.feed_picture_url
    
    def get_post_name(self, obj):
        return html.unescape(obj.post_name)
    
    def get_post_description(self, obj):
        return html.unescape(obj.post_description)
    
    def get_liked_by_user(self, obj):
        user = self.context['request'].user
        return user.posts_liked.filter(post_uuid=obj.post_uuid).exists()
    
class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_permissions(self):
        return [IsAuthenticated()]
    
    def get_queryset(self):
        feed_uuid = self.request.GET.get('feed_uuid', None)
        if feed_uuid is not None:
            return Post.objects.filter(feed__feed_uuid=feed_uuid).order_by("-post_published_date")
        return Post.objects.all()
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

        
    @action(methods=["GET"], detail=False, permission_classes=[AllowAny()])
    def explore(self, request, **kwargs):
        page = int(self.request.GET.get('page', 0))
        if request.user:
            queryset = Post.objects.exclude(feed__in=request.user.feeds_following.all()).order_by("-post_published_date")
        else:
            queryset = Post.objects.all().order_by("-post_published_date")
            
        queryset = get_paginated_queryset(queryset, page)

        serializer = PostSerializer(queryset, many=True, context=self.get_serializer_context())
        return Response(
            { 
             "data": _add_user_metadata_to_posts(serializer.data, request.user), 
             "count": len(queryset), 
             "current_page": page, 
             "next_page": page + 1 if len(queryset) >= DEFAULT_PAGE_SIZE else None  
            }, 
            status=200
        )
    
    # should this be handled as a query param on the get_queryset method?
    @action(methods=["GET"], detail=False)
    def timeline(self, request, **kwargs):
        page = int(self.request.GET.get('page', 0))
        if request.user.feeds_following.count() == 0:
            queryset = Post.objects.exclude().order_by("-post_published_date")
        else:
            queryset = Post.objects.filter(feed__in=request.user.feeds_following.all()).order_by("-post_published_date")

        queryset = get_paginated_queryset(queryset, page)

        serializer = PostSerializer(queryset, many=True, context=self.get_serializer_context())
        return Response(
            { 
             "data": _add_user_metadata_to_posts(serializer.data, request.user), 
             "count": len(queryset), 
             "current_page": page, 
             "next_page": page + 1 if len(queryset) >= DEFAULT_PAGE_SIZE else None  
            }, 
            status=200
        )    

        
    @action(methods=["POST"], detail=True)
    def like(self, request, **kwargs):
        post = self.get_object()

        # optimize this?
        if post in request.user.posts_liked.all():  
            return Response(status=200, data={ "liked": False, "detail": "Post already liked by user" })
        
        post.post_like_count += 1
        post.save()
        
        request.user.posts_liked.add(post)
        request.user.save()
                    
        return Response(status=200, data={ "liked": True, "detail": "" })
    
    @action(methods=["POST"], detail=True)
    def unlike(self, request, **kwargs):
        post = self.get_object()

        # optimize this?
        if post not in request.user.posts_liked.all():  
            return Response(status=200, data={ "unliked": False, "detail": "Post already not liked by user" })
        
        post.post_like_count -= 1
        post.save()
        
        request.user.posts_liked.remove(post)
        request.user.save()
                    
        return Response(status=200, data={ "unliked": True, "detail": "" })
    
class PostCommentSerializer(serializers.ModelSerializer):
    comment_username = serializers.SerializerMethodField()
    comment_user_email = serializers.SerializerMethodField()

    class Meta:
        model = PostComment
        fields = "__all__"
        read_only_fields = ["comment_uuid", "post", "comment_timestamp", "comment_username", "comment_user_email"]

    def get_comment_username(self, obj):
        return obj.comment_author.username
    
    def get_comment_user_email(self, obj):
        return obj.comment_author.email
    
class PostCommentViewset(viewsets.ModelViewSet):
    serializer_class = PostCommentSerializer


    def get_permissions(self):
        return [IsAuthenticated()]

    def get_queryset(self):
        post_uuid = self.request.GET.get('post_uuid', None)
        if post_uuid is not None:
            return PostComment.objects.filter(post__post_uuid=post_uuid).order_by("-comment_timestamp")
        return PostComment.objects.all()

    
    def create(self, request, **kwargs):
        post_uuid = request.data.get('comment_post_uuid')
        comment_content = request.data.get('comment_content')

        try:
            post = Post.objects.get(post_uuid=post_uuid)
        except Post.DoesNotExist:
            return Response(status=400, data={"detail": "Invalid post UUID"})

        comment = PostComment.objects.create(post=post, comment_author=request.user, comment_content=comment_content)
        post.post_comment_count += 1
        post.save()
        serializer = self.get_serializer(comment)
        return Response(serializer.data, status=201)
    