import json

from django.http import Http404, JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from article.models import Article, Image
from article.serializers import ArticleSerializer, ImageSerializer
from stufolio import settings


class ArticleList(generics.ListAPIView, APIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    # 게시글 리스트 반환 제너릭 설정

    def _is_image_available(self, pk):
        try:
            Image.objects.get(id=pk)
            return True
        except Image.DoesNotExist:
            return False

    def post(self, request):
        if request.user.is_authenticated: # 사용자가 인증 되었을경우
            serializer = ArticleSerializer(data=request.data)
            for temp in json.loads(request.data.get('images_id')): # 이미지의 id값들이 유효한지 체크
                if not self._is_image_available(temp): # 잘못된 id값을 받았을 경우
                    return Response(
                        status=status.HTTP_406_NOT_ACCEPTABLE)
            if serializer.is_valid():
                serializer.save(writer=request.user)
                return JsonResponse(
                    serializer.data, status=status.HTTP_201_CREATED)
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ArticleDetail(generics.RetrieveAPIView, APIView):
    def _get_object(self, pk):
        try:
            return Article.objects.get(id=pk)
        except Article.DoesNotExist:
            raise Http404

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    # 게시글 받아오는 기능 제너릭 설정

    def put(self, request, pk): # 게시글 수정
        article = self._get_object(pk)
        serializer = ArticleSerializer(article, data=request.data)
        if str(getattr(article, 'writer')) == request.user.username:  # 인증
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):  # 게시글 수정
        article = self._get_object(pk)
        serializer = ArticleSerializer(article, data=request.data)
        if str(getattr(article, 'writer')) == request.user.username:  # 인증
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageCreation(generics.CreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    # 이미지 생성 제너릭 설정


@api_view(['GET'])
def image(request, pk): # 이미지 반환
    test_file = open(
        settings.BASE_DIR + "/" + str(get_object_or_404(Image, pk=pk).image),
        'rb')
    return HttpResponse(
        content=test_file,
        content_type="image/jpeg",
        status=status.HTTP_200_OK)


@api_view(['POST'])
def article_heart(request, pk): # 게시글에 하트 추가
    article = get_object_or_404(Article, pk=pk)
    article_heart, article_heart_created = article.heart_set.get_or_create(
        user=request.user)
    if article_heart_created:
        return JsonResponse({
            'like_count': article.count_hearts,
            'isCreated': True,
            'username': request.user.username
        })
    article_heart.delete()
    return JsonResponse({
        'like_count': article.count_hearts,
        'isCreated': False,
        'username': request.user.username
    })
    # 하트가 눌린 게시글의 경우 하트 제거, 하트가 눌리지 않은 게시글의 경우 하트 생성


@api_view(['GET'])
def article_profile(request, string): #유저가 작성한 게시글을 반환
    try:
        u = User.objects.get(username=string)
        articles = Article.objects.filter(writer=u).values()
        return Response(articles, status=status.HTTP_200_OK)
    except Article.DoesNotExist:
        raise Http404
