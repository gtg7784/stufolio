from django.conf.urls import url
from search import views

urlpatterns = [
    url(r'^profiles/(?P<string>[\w\-]+)/$', views.search_profiles),
    url(r'^tags/(?P<string>[\w\-]+)/$', views.search_tags),
]