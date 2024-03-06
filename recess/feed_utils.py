from email.utils import parsedate_to_datetime
import datetime

# extract this later and consider all possibilities
def parse_date(entry):
    try:
        return parsedate_to_datetime(entry['published'] or entry['pubDate'])
    except Exception:
        pass
    
    try:
        return datetime.datetime.fromisoformat(entry['published'] or entry['pubDate'])
    except Exception as e:
        print(e)
        pass
    