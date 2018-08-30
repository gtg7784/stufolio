from django.db import models
from django.contrib.auth.models import User
from article.models import Article


class Block(models.Model):
    date = models.DateField(auto_now_add=True)
    article = models.ManyToManyField(Article)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=400, blank=True)
    school = models.CharField(max_length=20, blank=True)
    image = models.ImageField()
    #기본 소개
    num_of_articles = models.IntegerField(null=False, default=0)
    num_of_total_hearts = models.IntegerField(null=False, default=0)
    block = models.ManyToManyField(Block)