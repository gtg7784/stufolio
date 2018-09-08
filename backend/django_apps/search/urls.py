from django.conf.urls import url
from django_apps.search import views

urlpatterns = [
    url(r'^profiles/(?P<string>[\w\-]+)/$', views.search_profiles),
    url(r'^tags/(?P<string>[\w\-]+)/$', views.search_tags),
]