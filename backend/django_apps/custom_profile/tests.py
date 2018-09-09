from urllib.parse import urlencode, quote_plus

from django.test import TestCase, Client


class TestProfile(TestCase):
    def setUp(self):
        self.username = 'testing_account'
        self.password = 'for_the_test'
        self.email = 'testemail@somethingdoesntexists.com'
        # 계정 설정
        self.client = Client()
        # 뷰 테스트를 위한 client 객체 생성

    def test_sign_up(self):  # 회원가입 테스트
        params = {
            "username": self.username,
            "email": self.email,
            "password1": self.password,
            "password2": self.password
        }
        params = urlencode(params, quote_via=quote_plus)
        response = self.client.post(
            '/api/profiles/signup/',
            data=params,
            content_type="application/x-www-form-urlencoded"
        )  # 회원가입 form은 url encoding 된 형식만 받으므로 추가 작업
        assert response.status_code is 201