from django.db import models
from django.contrib.auth.models import User
from article.models import Article

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=400, blank=True)
    school = models.CharField(max_length=20, blank=True)
    image = models.ImageField()
