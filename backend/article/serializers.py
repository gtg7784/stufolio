from rest_framework import serializers
from article.models import Article

from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


class ArticleSerializer(TaggitSerializer, serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='writer.username')
    heart_user_set = serializers.StringRelatedField(read_only=True, many=True)
    tags = TagListSerializerField()

    class Meta:
        model = Article
        fields = ('id', 'content', 'writer', 'heart_user_set', 'tags')