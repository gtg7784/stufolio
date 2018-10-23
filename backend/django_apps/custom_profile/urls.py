from django.conf.urls import url
from django_apps.custom_profile import views

urlpatterns = [
    url(r'token/$', views.long_lived_token),  # 소셜 로그인시에 기간이 긴 추가 토큰을 얻는 라우트
    url(r'^image/(?P<string>[\w\-]+)/$', views.image),  # 프로필 이미지를 얻는 라우트
    url(r'^signup/$', views.sign_up),  # 회원가입 요청을 넣는 라우트
    url(r'^change/username/$', views.change_username),  # 유저 이름을 변경하는 라우트
    url(r'^(?P<string>[\w\-]+)/$',
        views.ProfileDetail.as_view()),  # <유저 이름>의 프로필을 조회 하는 라우트
    url(r'^$', views.ProfileOverall.as_view()),  # 프로필 정보를 얻거나 , 변경하는 라우트
]
