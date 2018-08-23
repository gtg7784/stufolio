from rest_framework import generics
# 제너릭
from api.models import Article
from api.serializers import ArticleSerializer


class ArticleList(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer = ArticleSerializer