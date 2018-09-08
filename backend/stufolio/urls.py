from django.contrib import admin
from django.conf.urls import url, include

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^articles/', include('django_apps.article.urls')),
    url(r'^profiles/', include('django_apps.custom_profile.urls')),
    url(r'^search/', include('django_apps.search.urls'))
]
urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns = urlpatterns + [url(r'^admin/', admin.site.urls)]
