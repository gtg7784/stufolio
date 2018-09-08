import json

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django_apps.custom_profile.models import Profile
from django_apps.custom_profile.forms import SignUpForm
from django_apps.custom_profile.serializers import ProfileSerializer

from stufolio import settings


class ProfileOverall(APIView):  # 자신의 프로필 수정
    def get(self, request):  # 프로필 조회
        if request.user.is_authenticated:
            profile = request.user.profile
            return Response(
                {
                    'bio': profile.bio,  # 상태 메시지
                    'school': profile.school,  # 학교
                },
                status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request):
        if request.user.is_authenticated:
            serializer = ProfileSerializer(
                request.user.profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class ProfileDetail(APIView):
    def get(self, request, string):  # 프로필 조회
        user = User.objects.get(username=string)
        profile = user.profile
        return Response(
            {
                'bio': profile.bio,  # 상태 메시지
                'school': profile.school,  # 학교
            },
            status=status.HTTP_200_OK)


@api_view(['GET'])
def image(request, string):  # 프로필 사진 반환
    user = User.objects.get(username=string)
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
    if form.is_valid():
        user = form.save(commit=False)
        user.save()
        Profile.objects.create(user=user)
        return Response(
            {
                'account_created': True
            }, status=status.HTTP_201_CREATED)
    return Response(
        {
            'account_created': False
        }, status=status.HTTP_406_NOT_ACCEPTABLE)
