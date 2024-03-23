from email.utils import parsedate_to_datetime
from datetime import datetime
from django.utils import timezone
from dateutil import parser
import pytz

# if the feeds give us a timezone, use that, else default to UTC
def tz_aware_datetime(datetime, default_timezone='UTC'):
    if timezone.is_aware(datetime):
        return datetime
    else:
        default_tz = pytz.timezone(default_timezone)
        aware_datetime = timezone.make_aware(datetime, default_tz)
        return aware_datetime


def parse_date(date_str):
    parsing_methods = [
        lambda d: tz_aware_datetime(parsedate_to_datetime(d)),
        lambda d: tz_aware_datetime(datetime.fromisoformat(d)),
        lambda d: tz_aware_datetime(parser.parse(d))
    ]

    last_exception = None
    for method in parsing_methods:
        try:
            return method(date_str)
        except Exception as e:
            last_exception = e
            continue  

    print('Could not parse date:', date_str, last_exception)
    return None
