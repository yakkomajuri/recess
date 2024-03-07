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
def parse_date(entry):
    try:
        return tz_aware_datetime(parsedate_to_datetime(entry['published'] or entry['pubDate']))
    except Exception:
        pass
    
    try:
        return tz_aware_datetime(datetime.fromisoformat(entry['published'] or entry['pubDate']))
    except Exception as e:
        print('Could not parse date', entry, e)
        return None
    

