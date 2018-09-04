from django.conf.urls import url
from article import views

urlpatterns = [
    url(r'^pages/(?P<pk>[0-9]+)/$', views.get_articles_page)
    url(r'^images/(?P<pk>[0-9]+)/$', views.image),
    url(r'^images/$', views.ImageCreation.as_view()),
    url(r'^user/(?P<string>[\w\-]+)/$', views.article_profile),
    url(r'^(?P<pk>[0-9]+)/$', views.ArticleDetail.as_view()),
    url(r'^(?P<pk>[0-9]+)/heart/$', views.article_heart),
    url(r'^$', views.ArticleList.as_view()),
]
