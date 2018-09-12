from django.contrib import admin
from django.conf.urls import url, include
from django.views.generic import TemplateView

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views

urlpatterns = [
    url(r'^api/articles/', include('django_apps.article.urls')),
    url(r'^api/profiles/', include('django_apps.custom_profile.urls')),
    url(r'^api/search/', include('django_apps.search.urls'))
]


urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns = urlpatterns + [
    url(r'^api/auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^api/token-auth/', views.obtain_auth_token),
    url(r'^admin/', admin.site.urls),
    url(r'^page/', TemplateView.as_view(template_name="index.html"))
]
