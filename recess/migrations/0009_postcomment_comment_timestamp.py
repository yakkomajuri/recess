# Generated by Django 5.0.2 on 2024-03-02 01:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recess', '0008_user_posts_liked'),
    ]

    operations = [
        migrations.AddField(
            model_name='postcomment',
            name='comment_timestamp',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]