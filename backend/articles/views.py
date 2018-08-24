from django.http import Http404, JsonResponse

from rest_framework import generics, mixins, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import status, generics

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
