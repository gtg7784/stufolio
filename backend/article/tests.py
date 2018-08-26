import os

from django.test import TestCase, Client
from model_mommy import mommy
from django.contrib.auth.models import User


class TestArticle(TestCase):
    def setUp(self):
        self.tags = ["tagging", "test"]
        self.user = User.objects.create(
            username='for_testing_user', password='for_the_test')
        self.article = mommy.make(
            'Article', writer=self.user, content='testing', tags=self.tags)
        self.article_heart = self.article.heart_set.get_or_create(
            user=self.user)[0]

    def test_article_post(self):  #DB에 테스트
        assert self.article.content is 'testing'
        assert self.article.writer is self.user
        assert self.article.tags is self.tags

    def test_heart_to_article(self):  #DB에 테스트
        assert self.article.count_hearts is 1
        assert self.article_heart.user is self.user

    def tearDown(self):
        self.user.delete()