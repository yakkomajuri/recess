
from django.contrib import admin
from django.urls import path
from .api.feed import FeedViewset
from .api.post import PostViewset, PostCommentViewset
from .api.user import UserViewSet
from rest_framework_extensions.routers import ExtendedDefaultRouter


class Router(ExtendedDefaultRouter):
    """ExtendedDefaultRouter with optional trailing slash and drf-extensions nesting."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.trailing_slash = r"/?"


router = Router()
router.register(r"feed", FeedViewset, basename="feed")
router.register(r"posts", PostViewset, basename="posts")
router.register(r'user', UserViewSet, basename='user')
router.register(r'post_comments', PostCommentViewset, basename='post_comments')



urlpatterns = [
    path('admin/', admin.site.urls),
    *router.urls
]

