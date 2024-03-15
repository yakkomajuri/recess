from django.apps import AppConfig
import threading
import sys

class RecessConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recess'

    def ready(self):
        # don't run this update_feeds thread on the Django shell, migrations, etc
        if sys.argv[1] == 'runserver' or 'gunicorn' in sys.argv[0]:
            from recess.update_feeds import update_feeds

            thread = threading.Thread(target=update_feeds)
            thread.daemon = True
            thread.start()