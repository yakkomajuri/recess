from django.http import HttpResponse
from django.contrib.auth import get_user_model
from recess.models import EmailOptOut
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str



def opt_out(request, email, opt_out_token):
    
    queryset = EmailOptOut.objects.filter(email=force_str(urlsafe_base64_decode(email)), opt_out_token=force_str(urlsafe_base64_decode(opt_out_token)))
    if len(queryset) > 0:
        queryset[0].opted_out = True
        queryset[0].save()
        
        return HttpResponse('Succesfully opted out from notifications')

    return HttpResponse('Invalid opt out link')

