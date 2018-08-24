from django.conf.urls import url
from articles import views

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/$', views.ArticleDetail.as_view()),
    url(r'^$', views.ArticleList.as_view()),
]