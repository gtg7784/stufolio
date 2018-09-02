from django.conf.urls import url
from custom_profile import views

urlpatterns = [
    url(r'^$', views.ProfileOverall.as_view()),
    url(r'^(?P<string>[\w\-]+)/$', views.ProfileDetail.as_view())
    url(r'^image/(?P<string>[\w\-]+)/$', views.ProfileDetail.as_view())
]
