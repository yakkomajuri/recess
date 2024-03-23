from email.utils import parsedate_to_datetime
from datetime import datetime
from django.utils import timezone
import pytz

# if the feeds give us a timezone, use that, else default to UTC
def tz_aware_datetime(datetime, default_timezone='UTC'):
    if timezone.is_aware(datetime):
        return datetime
    else:
        default_tz = pytz.timezone(default_timezone)
        aware_datetime = timezone.make_aware(datetime, default_tz)
        return aware_datetime

# extract this later and consider all possibilities
def parse_date(date_str):
    try:
        return tz_aware_datetime(parsedate_to_datetime(date_str))
    except Exception:
        pass
    
    try:
        return tz_aware_datetime(datetime.fromisoformat(date_str))
    except Exception as e:
        print('Could not parse date', date_str, e)
        return None
    