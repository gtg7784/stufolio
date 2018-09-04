from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from article.models import Article

# Search articles
# - written by whom,
# - the tag of it

# Search profiles
# - username


@api_view(['GET'])
def search_profiles(request, string):
    user = User.objects.filter(username__contains=string)
    result = []
    for temp in user.values('username'):
        result += [temp]

    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_tags(request, string):
    result = {'articles': []}
    for temp in Article.objects.filter(tags__contains=[string]):
        article = {
            'id': int(),
            'writer': str(),
            'content': str(),
            'images_id': list(),
            'tags': list()
        }
        article['id'] = temp.id
        article['writer'] = temp.writer.username
        article['content'] = temp.content
        article['images_id'] = temp.images_id  # images_id 필드 자체로 배열
        article['tags'] = temp.tags  # 태그 추가
        print(article)
        result.get('articles').append(article)

    return Response(result, status=status.HTTP_200_OK)