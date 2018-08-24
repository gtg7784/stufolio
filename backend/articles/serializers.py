from rest_framework import serializers
from articles.models import Articles


class ArticleSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='writer.username')

    #'writer'이름으로 보내진 parameter의 'username'객체를 자동저장
    class Meta:
        model = Articles
        fields = ('id', 'content', 'writer', 'tags', 'interested_users')
