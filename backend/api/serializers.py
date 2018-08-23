"""
DB와 파이썬 코드를 연결함
"""

from rest_framework import serializers
from api.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='writer.username')

    class Meta:
        model = Article
        fields = ('id', 'writer', 'content')  #DB 컬럼네임들
