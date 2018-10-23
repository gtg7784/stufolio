#테스트를 하는 파일

from django.test import TestCase, Client
from model_mommy import mommy
from django.contrib.auth.models import User

from stufolio import settings


class TestArticle(TestCase):
    def setUp(self):
        self.username = 'for_testing_user'
        self.password = 'for_the_test'
        self.email = 'test_account@testsomething.nothing'

        User.objects.create(
            username=self.username, email=self.email, password=self.password)
        # 계정 설정
        self.user = User.objects.get(username=self.username)

        self.tags = ["tagging", "test"]
        self.article = mommy.make(
            'Article', writer=self.user, content='testing', tags=self.tags)
        self.article_heart = self.article.heart_set.get_or_create(
            user=self.user)[0]
        self.image_id = int()
        # 객체 생성
        self.client = Client()

        self.client.force_login(
            self.user, backend=settings.AUTHENTICATION_BACKENDS[-1])

        # 뷰 테스트를 위한 client 객체 생성

    def test_make_article(self):  # DB에 게시글 추가 테스트
        assert self.article.content is 'testing'
        assert self.article.writer is self.user
        assert self.article.tags is self.tags

    def test_make_heart_to_article(self):  # DB에 하트 생성 테스트
        assert self.article.count_hearts is 1
        assert self.article_heart.user is self.user

    def tearDown(self):
        self.user.delete()