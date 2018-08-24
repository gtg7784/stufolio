from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    writer = models.ForeignKey(
        'auth.user', related_name='articles', on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=True)

    def __str__(self):  #문자열 표현
        return self.content
