from article.models import Article
from django.contrib.auth.models import User
from custom_profile.models import Profile

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Search articles
# - written by whom,
# - the tag of it

# Search profiles
# - username


@api_view(['GET'])
def search_profiles(request, string):
    user = User.objects.filter(username__contains=string)
    result = []
    print(user)
    for temp in user.values('username'):
        result += [temp]

    return Response(result, status=status.HTTP_200_OK)