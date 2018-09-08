from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.CharField(max_length=400, blank=True)
    school = models.CharField(max_length=20, blank=True)
    image = ProcessedImageField(
        upload_to='static/uploaded/images/profile/%Y/%m/%d/',
        format='JPEG',
        options={'quality': 70})
