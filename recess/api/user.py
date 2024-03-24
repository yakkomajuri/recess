from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import login, logout, authenticate
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from recess.models import Feed, EmailVerificationStatus
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404
from rest_framework import response
from recess.utils.hash_utils import generate_md5_hash

User = get_user_model()


class InternalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'bio', 'password', 'email']

        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class UserSerializer(serializers.ModelSerializer):
    
    email_hash = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'bio', 'feeds_following', 'email_hash']
        read_only_fields = ['username', 'bio', 'feeds_following', 'email_hash']

        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    # used to pull user's gravatar
    def get_email_hash(self, obj):
        return generate_md5_hash(obj.email)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    permission_classes_by_action = {'create': [AllowAny],
                                     'login': [AllowAny],
                                    'profile': [AllowAny],
                                     'logout': [IsAuthenticated],
                                     'check': [IsAuthenticated],
                                     'details': [IsAuthenticated]}
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAdminUser()]

    def create(self, request):
        serializer = InternalUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'])
    def change_password(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not user.check_password(old_password):
            return Response({'old_password': ['Wrong password.']}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        return Response(status=status.HTTP_200_OK)

    # Email verification still needs a fair bit of polish
    # At the moment it will build a URL that hits the API endpoint
    # i.e. in prod this will be us.recessfeed.com/...
    @action(detail=False, methods=['post'])
    def send_verification_email(self, request):
        user = request.user
        token = PasswordResetTokenGenerator().make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        link = request.build_absolute_uri(reverse('verify', kwargs={'uidb64': uid, 'token': token}))
        
        subject = 'Activate Your Account'
        html_message = render_to_string('verification_email.html', {
            'user': user,
            'link': link,
        })
        email = EmailMessage(
            subject,
            html_message,
            'yakko@recessfeed.com',
            [user.email],
        )
        email.content_subtype = "html"
        email.send()

        user.email_verification_status = EmailVerificationStatus.VerifyEmailSent
        user.save()
        return Response(status=status.HTTP_200_OK)


    @action(detail=False, methods=['put'])
    def update_bio(self, request):
        user = request.user
        bio = request.data.get('bio')

        if len(bio) > 500:
            raise ValidationError("Bio is too long.")

        user.bio = bio
        user.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(methods=["POST"], detail=False)
    def follow_feed(self, request, **kwargs):
        feed = Feed.objects.get(feed_uuid=request.data.get('feed_uuid'))
        request.user.feeds_following.add(feed)
        request.user.save()
        feed.feed_follower_count += 1
        feed.save()
        return Response(status=200)
    
        
    @action(methods=["POST"], detail=False)
    def unfollow_feed(self, request, **kwargs):
        feed = Feed.objects.get(feed_uuid=request.data.get('feed_uuid'))
        request.user.feeds_following.remove(feed)
        request.user.save()
        feed.feed_follower_count -= 1
        feed.save()
        return Response(status=200)
    
    @action(methods=["GET"], detail=False)
    def details(self, request, **kwargs):
        user = request.user
        return Response(
            status=200, 
            data={ 
                  "email": user.email, 
                  "username": user.username, 
                  "feeds_following": [feed.feed_uuid for feed in user.feeds_following.all()],
                  "feeds_owned": [feed.feed_uuid for feed in Feed.objects.filter(feed_publisher_email=user.email)],
                  "bio": user.bio, 
                  "email_verification_status": user.email_verification_status,
                }
            )

    @action(methods=["GET"], detail=False)
    def profile(self, request, **kwargs):
        username = request.GET.get('username')
        user = get_object_or_404(User.objects.all(), username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"])
    def search(self, request):
        search_param = request.query_params.get("search")
        if search_param:
            users = User.objects.filter(username__icontains=search_param)[:5]
            serializer = self.get_serializer(users, many=True)
            return response.Response(serializer.data)
        else:
            return response.Response([])