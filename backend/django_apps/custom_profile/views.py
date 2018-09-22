import json, requests

from django.http import HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from django_apps.custom_profile.forms import SignUpForm
from django_apps.custom_profile.models import Profile
from django_apps.custom_profile.serializers import ProfileSerializer
from stufolio import settings
from stufolio.settings import SOCIAL_AUTH_FACEBOOK_SECRET


class ProfileOverall(APIView):  # 자신의 프로필 수정
    def get(self, request):  # 프로필 조회
        if request.user.is_authenticated:
            try:
                profile = Profile.objects.get(user=request.user)
            except:
                Profile.objects.create(user=request.user)
                profile = Profile.objects.get(user=request.user)
            return Response(
                {
                    'username': request.user.username,
                    'bio': profile.bio,  # 상태 메시지
                    'school': profile.school,  # 학교
                },
                status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request):
        if request.user.is_authenticated:
            try:
                profile = Profile.objects.get(user=request.user)
            except:
                Profile.objects.create(user=request.user)
                profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                profile = Profile.objects.get(user=request.user)
                return Response(
                    {
                        'username': request.user.username,
                        'bio': profile.bio,  # 상태 메시지
                        'school': profile.school,  # 학교
                    },
                    status=status.HTTP_200_OK)
            return Response(
                serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class ProfileDetail(APIView):
    def get(self, request, string):  # 프로필 조회
        try:
            user = User.objects.get(username=string)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            profile = Profile.objects.get(user=user)
        except:
            Profile.objects.create(user=user)
            profile = Profile.objects.get(user=user)
        return Response(
            {
                'bio': profile.bio,  # 상태 메시지
                'school': profile.school,  # 학교
            },
            status=status.HTTP_200_OK)


@api_view(['GET'])
def image(request, string):  # 프로필 사진 반환
    try:
        user = User.objects.get(username=string)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if str(get_object_or_404(Profile, user=user).image) is "":  # 이미지가 없을때
        return Response(status=status.HTTP_404_NOT_FOUND)

    test_file = open(
        settings.BASE_DIR + "/" + str(
            get_object_or_404(Profile, user=user).image), 'rb')
    return HttpResponse(
        content=test_file,
        content_type="image/jpeg",
        status=status.HTTP_200_OK)


@api_view(['POST'])
def sign_up(request):  # 회원가입
    form = SignUpForm(request.POST)
    try:
        User.objects.get(email=request.POST['email'])
        return Response(
            {
                "email": "해당 이메일은 이미 존재합니다."
            },
            status=status.HTTP_406_NOT_ACCEPTABLE)
    except User.DoesNotExist:  # 이메일이 중복이 아닐경우에
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            Profile.objects.create(user=user)
            Token.objects.create(user=user)
            return Response(status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def change_username(request):
    if request.user.is_authenticated:
        try:
            newusername = request.POST['username']
            if User.objects.filter(username=newusername).exists():
                return Response({"username": "해당 사용자 이름은 이미 존재합니다."})
            request.user.username = newusername
            request.user.save()
            return Response(
                {
                    "new_username": request.user.username
                },
                status=status.HTTP_200_OK)
        except:
            pass
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def long_lived_token(request):
    print(request.data['short_token'])
    try:
        url = "https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=" + settings.SOCIAL_AUTH_FACEBOOK_KEY + "&client_secret=" + SOCIAL_AUTH_FACEBOOK_SECRET + "&fb_exchange_token=" + request.data['short_token']
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(
        json.loads(requests.get(url).text)['access_token'],
        status=status.HTTP_200_OK)
