from rest_framework import serializers
from django_apps.custom_profile.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("id", "bio", "school", "image")