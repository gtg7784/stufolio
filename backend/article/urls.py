from django.conf.urls import url
from article import views

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/$', views.ArticleDetail.as_view()),
    url(r'^(?P<pk>[0-9]+)/heart/$', views.article_heart),
    url(r'^$', views.ArticleList.as_view()),
]
