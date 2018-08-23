"""
다룰 데이터의 모델
"""

from django.db import models
from django.contrib.auth.models import User  # User 정보를 담기위해 필요함


class Article(models.Model):
    created = models.DateTimeField(auto_now_add=True)  #날짜는 자동으로 추가됨
    writer = models.ForeignKey(
        'auth.User', related_name='user', on_delete=models.CASCADE)
    content = models.TextField(null=True, blank=True)  #게시글

    class Meta:
        ordering = ('created', )
