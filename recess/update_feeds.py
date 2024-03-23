import time
from recess.models import Feed, Post, User, EmailVerificationStatus, Lock
import feedparser
import requests
from email.utils import parsedate_to_datetime
from recess.utils.feed_utils import parse_date, tz_aware_datetime
from recess.utils.lock_utils import get_lock, release_lock
import os

FEED_UPDATE_LOCK = 'feed-update'
SLEEP_DURATION = 300

def update_feeds():
    Lock.objects.get_or_create(lock_name=FEED_UPDATE_LOCK)
    had_lock = False
    
    while True:
        if not had_lock:
            time.sleep(SLEEP_DURATION)
        
        if not get_lock(FEED_UPDATE_LOCK):
            print(os.getpid(), 'I do not have the lock')
            continue
        
        print(os.getpid(), 'I have the lock')
        print('Updating feeds...')
        for feed in Feed.objects.all():
            print(f'Updating feed {feed.feed_name} ({feed.feed_uuid})')
            try:
                rss_feed = feedparser.parse(feed.feed_url)
                feed_last_publish = tz_aware_datetime(parse_date(rss_feed.feed.updated)) if hasattr(rss_feed.feed, 'updated') else None
                
                
                # if the feed declares when it was published and that hasn't changed since we last imported it, no need to update
                if (feed_last_publish is not None) and (feed_last_publish == feed.feed_last_publish):
                    continue
                
                feed.feed_name = rss_feed.feed.title
                feed.feed_description = rss_feed.feed.description
                feed_picture_url = ''
                
                feed_publisher_email = None
                
                if hasattr(rss_feed.feed, 'publisher_detail') and hasattr(rss_feed.feed.publisher_detail, 'email'):
                    feed_publisher_email = rss_feed.feed.publisher_detail.email
                
                if feed_publisher_email is not None:
                    feed.feed_publisher_email = feed_publisher_email
                    user_queryset = User.objects.filter(email=feed_publisher_email, email_verification_status=EmailVerificationStatus.Verified)
                    if len(user_queryset) > 0:
                        feed.feed_owner = user_queryset[0]
                
                if hasattr(rss_feed.feed, 'image') and hasattr(rss_feed.feed.image, 'href'):
                    feed_picture_url = rss_feed.feed.image.href 
                elif hasattr(rss_feed.feed, 'author') and hasattr(rss_feed.feed.author, 'logo'):
                    feed_picture_url = rss_feed.author.logo 
                elif hasattr(rss_feed.feed, 'link'):
                    res = requests.get(rss_feed.feed.link + '/favicon.ico')
                    if res.status_code == 200:
                        feed_picture_url = rss_feed.feed.link + '/favicon.ico'
                        
                feed.feed_picture_url = feed_picture_url
            
                for entry in rss_feed.entries:
                    post_published_date = parse_date(entry.get('published') or entry.get('pubDate'))
                    
                    # we're currently skipping posts we can't get a date for
                    # is this the best approach?
                    if post_published_date is None:
                        continue
                        
                    # unsure what this conditional should really be at this stage
                    # should we cover posts added in the past? should we update old posts?
                    # currently by checking that the link exists we're actually guarding against the
                    # feed being wrong and not updating their lastBuildDate - unsure we should
                    if (post_published_date and post_published_date > feed.feed_last_publish) and (not Post.objects.filter(post_url=entry['link'], feed=feed).exists()):
                        print(f"New post {entry['title']}")
                        try:
                            Post.objects.create(
                                feed = feed,
                                post_url = entry['link'],
                                post_name = entry['title'],
                                post_published_date = post_published_date,
                                post_description = entry['summary']
                            )
                        except:
                            pass
                
                feed.feed_last_publish = feed_last_publish
                feed.save()
                        
            except Exception as e:
                # it's ok if we can't update a feed. 
                # this should be flagged somewhere in the future so we can do something
                # but for now it's ok
                print(e)

            
            time.sleep(SLEEP_DURATION)
            
            # release lock after sleep to prevent a lagging worker from picking it up on the same iteration
            had_lock = True
            release_lock(FEED_UPDATE_LOCK)

            
            
        
        
        
        