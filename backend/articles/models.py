from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):
    created = models.DateTimeField(auto_now_add=True, related_name='articles')
    writer = models.ForeignKey(
        'auth.user', related_name='articles', on_delete=models.CASCADE)
    content = models.TextField(null=False, related_name='articles', blank=True)
    tags = ArrayField(ArrayField(models.CharField(max_length=20)))
    interested_users = ArrayField(
        null=True, ArrayField(models.CharField(max_length=20)))

    def __str__(self):  #문자열 표현
        return self.content
