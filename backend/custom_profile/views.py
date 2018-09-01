from rest_framework import generics, permissions

from custom_profile.models import Profile
from custom_profile.serializers import ProfileSerializer


class Profile(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permissions = (permissions.IsAuthenticatedOrReadOnly)
