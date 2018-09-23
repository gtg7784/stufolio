from django.db import models
from django.contrib.postgres.fields import JSONField

from imagekit.models import ImageSpecField
from imagekit.processors import Thumbnail


class Image(models.Model):
    image = models.ImageField(upload_to='static/uploaded/images/%Y/%m/%d/', )
    thumbnail = ImageSpecField(
        source='image',
        processors=[Thumbnail(100, 100)],
        format='JPEG',
        options={'quality': 60})


class Article(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    writer = models.ForeignKey(
        'auth.user', related_name='article', on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=True)
    heart_user_set = models.ManyToManyField(
        'auth.user',
        blank=True,
        related_name='heart_user_set',
        through='Heart')  # Article.heart_user_set으로 접근 가능 설정
    images_id = JSONField(
        blank=False, null=False,
        default=list)  # 한 게시글 당 여러 이미지를 저장 하기 위한 JSONField사용
    tags = JSONField(default=list)

    def __str__(self):  # 문자열 표현
        return self.content

    @property
    def count_hearts(self):
        return self.heart_user_set.count()

    class Meta:
        ordering = ('created_at', )


class Heart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.user', on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
