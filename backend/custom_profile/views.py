import json

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from custom_profile.models import Profile
from custom_profile.forms import SignUpForm
from custom_profile.serializers import ProfileSerializer

from stufolio import settings


class ProfileOverall(APIView):
    def patch(self, request):
        serializer = ProfileSerializer(request.user.profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileDetail(APIView):
    def get(self, request, string):
        user = User.objects.get(username=string)
        profile = user.profile
        return Response(
            {
                'bio': profile.bio,
                'school': profile.school,
                'image': str(profile.image)
            },
            status=status.HTTP_200_OK)


@api_view(['GET'])
def image(request, string):
    user = User.objects.get(username=string)
    test_file = open(
        settings.BASE_DIR + "/" + str(
            get_object_or_404(Profile, user=user).image), 'rb')
    return HttpResponse(
        content=test_file,
        content_type="image/jpeg",
        status=status.HTTP_200_OK)


@api_view(['POST'])
def sign_up(request):
    form = SignUpForm(request.POST)
    if form.is_valid():
        user = form.save(commit=False)
        user.save()
        Profile.objects.create(user=user)
        return Response(
            {
                'account_created': True
            }, status=status.HTTP_201_CREATED)
    else:
        return Response(
            {
                'account_created': False
            }, status=status.HTTP_406_NOT_ACCEPTABLE)
