# api urls

* api/auth/ : rest_framework_oauth2 관련
* api/articles/ : article 관련
  * pages/ : page 별 로드
  * images/(?P<pk>[0-9]+)/ : 이미지 접근
  * images/ : 이미지 생성
  * user/(?P<string>[\w\-]+)/ : 특정 user가 작성한 게시글만 모아받기
  * (?P<pk>[0-9]+)/ : 특정 article 접근
  * / : 전체 article 접근
* api/profiles/
  * image/(?P<string>[\w\-]+)/ : 특정 user의 프로필 이미지 접근
  * signup/ : 회원가입
  * (?P<string>[\w\-]+)/ : 특정 user의 프로필 접근
  * / : 본인 프로필 접근
* api/search/
  * profiles/(?P<string>[\w\-]+)/ : 프로필 검색
  * tags/(?P<string>[\w\-]+)/ : 태그 검색
