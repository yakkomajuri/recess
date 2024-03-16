from recess.models import Lock
import os
from django.db import transaction
import datetime
import pytz

def get_lock(lock_name, lock_duration=datetime.timedelta(minutes=1)) -> bool:
    with transaction.atomic():
        lock_object = Lock.objects.select_for_update().get(lock_name=lock_name)
        if lock_object.owner_process_id is None or datetime.datetime.now(tz=pytz.utc) > lock_object.lock_expiry:
            lock_object.owner_process_id = os.getpid()
            lock_object.lock_expiry = datetime.datetime.now(tz=pytz.utc) + lock_duration
            lock_object.save()
            return True
        return False

def release_lock(lock_name):
    lock_object = Lock.objects.get(lock_name=lock_name)
    lock_object.owner_process_id = None
    lock_object.save()
    
    
