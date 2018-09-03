from urllib.parse import urlencode, quote_plus

from django.test import TestCase, Client


class TestProfile(TestCase):
    def setUp(self):
        self.username = 'testing_account'
        self.password = 'for_the_test'
        self.email = 'testemail@somethingdoesntexists.com'
        self.client = Client()

    def test_sign_up(self):
        params = {
            "username": self.username,
            "email": self.email,
            "password1": self.password,
            "password2": self.password
        }
        params = urlencode(params, quote_via=quote_plus)
        response = self.client.post(
            '/profiles/signup/',
            data=params,
            content_type="application/x-www-form-urlencoded")
        assert response.status_code is 201