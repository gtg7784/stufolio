from rest_framework import serializers
from django_apps.article.models import Article, Image


class ArticleSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='writer.username')
    heart_user_set = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = Article
        fields = ('id', 'content', 'writer', 'heart_user_set', 'tags',
                  'images_id')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image')