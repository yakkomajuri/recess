from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from recess.models import EmailVerificationStatus, Feed
from recess.settings import APP_HOST

User = get_user_model()

def verify(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    
    if user is not None and PasswordResetTokenGenerator().check_token(user, token):
        user.email_verification_status = EmailVerificationStatus.Verified
        user.save()
        Feed.objects.filter(feed_publisher_email=user.email).update(feed_owner=user)
        return redirect(f"{APP_HOST}/profile")
    else:
        user.email_verification_status = EmailVerificationStatus.NotVerified
        return HttpResponse('Activation link is invalid!')
