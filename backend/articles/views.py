from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required

from rest_framework import generics, mixins, permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from articles.models import Article
from articles.serializers import ArticleSerializer


class ArticleList(generics.ListAPIView, APIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def post(self, request, format=None):
        if request.user.is_authenticated:
            serializer = ArticleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(writer=request.user)
                return JsonResponse(
                    serializer.data, status=status.HTTP_201_CREATED)
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ArticleDetail(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )


@api_view(['POST'])
def article_heart(request, pk):
    article = get_object_or_404(Article, pk=pk)
    article_heart, article_heart_created = article.heart_set.get_or_create(
        user=request.user)
    if article_heart_created:
        return JsonResponse({
            'like_count': article.count_hearts,
            'isCreated': True,
            'username': request.user.username
        })
    else:
        article_heart.delete()
        return JsonResponse({
            'like_count': article.count_hearts,
            'isCreated': False,
            'username': request.user.username
        })
