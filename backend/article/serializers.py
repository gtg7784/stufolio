from rest_framework import serializers
from article.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='writer.username')
    heart_user_set = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = Article
        fields = ('id', 'content', 'writer', 'heart_user_set')
