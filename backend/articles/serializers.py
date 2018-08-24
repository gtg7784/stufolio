from rest_framework import serializers
from articles.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='writer.username')

    #'writer'이름으로 보내진 parameter의 'username'객체를 자동저장
    class Meta:
        model = Article
        fields = ('id', 'content', 'writer')