from django.conf.urls import url
from django_apps.custom_profile import views

urlpatterns = [
    url(r'^image/(?P<string>[\w\-]+)/$', views.ProfileDetail.as_view()),
    url(r'^signup/$', views.sign_up),
    url(r'^(?P<string>[\w\-]+)/$', views.ProfileDetail.as_view()),
    url(r'^$', views.ProfileOverall.as_view()),
]
