from django.contrib import admin
from django.conf.urls import url, include

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [url(r'^articles/', include('article.urls'))]
urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns = urlpatterns + [url(r'^admin/', admin.site.urls)]
