from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django_apps.article.models import Article
from django_apps.article.serializers import ArticleSerializer

# Search articles
# - written by whom,
# - the tag of it

# Search profiles
# - username


@api_view(['GET'])
def search_profiles(request, string, pk):
    user = User.objects.filter(username__contains=string)
    result = []
    for temp in user.values('username')[int(pk) * 10 - 10:int(pk) * 10]:
        result += [temp]

    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_tags(request, string, pk):
    articles = Article.objects.filter(tags__contains=[string])
    serializer = ArticleSerializer(articles, many=True)

    return Response(
        serializer.data[int(pk) * 10 - 10:int(pk) * 10],
        status=status.HTTP_200_OK)
