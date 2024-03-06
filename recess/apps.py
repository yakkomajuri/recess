from django.apps import AppConfig
import threading

class RecessConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recess'

    def ready(self):

        from recess.update_feeds import update_feeds

        thread = threading.Thread(target=update_feeds)
        thread.daemon = True
        thread.start()