"""
Serializer는 DB와 작동하는 코드를 연결시켜주는것을 말하며,
본 코드에서의 "fields" 변수가 가르키는 내용은 주로 http 요청시에 필드에 관한 내용들임.
"""

from rest_framework import serializers
from django_apps.article.models import Article, Image


class ArticleSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='writer.username')
    heart_user_set = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = Article
        fields = ('id', 'created_at', 'content', 'writer', 'heart_user_set',
                  'tags', 'images_id')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image')