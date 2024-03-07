
from django.contrib import admin
from django.urls import path, re_path
from .api.feed import FeedViewset
from .api.post import PostViewset, PostCommentViewset
from .api.user import UserViewSet
from rest_framework_extensions.routers import ExtendedDefaultRouter
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


class Router(ExtendedDefaultRouter):
    """ExtendedDefaultRouter with optional trailing slash"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.trailing_slash = r"/?"


router = Router()
router.register(r"api/feed", FeedViewset, basename="feed")
router.register(r"api/posts", PostViewset, basename="posts")
router.register(r'api/user', UserViewSet, basename='user')
router.register(r'api/post_comments', PostCommentViewset, basename='post_comments')



urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name="app-root"),
    path('admin/', admin.site.urls),
    *router.urls,
    re_path(r'^', TemplateView.as_view(template_name='index.html'), name="app"),
] + staticfiles_urlpatterns()

