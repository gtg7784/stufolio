import os, datetime, pathlib, json
import requests

from django.test import TestCase, Client
from model_mommy import mommy
from django.contrib.auth.models import User


class TestArticle(TestCase):
    def setUp(self):
        self.username = 'for_testing_user'
        self.password = 'for_the_test'
        self.tags = ["tagging", "test"]
        self.user = User.objects.create(
            username=self.username, password=self.password)
        self.article = mommy.make(
            'Article', writer=self.user, content='testing', tags=self.tags)
        self.article_heart = self.article.heart_set.get_or_create(
            user=self.user)[0]
        self.client = Client()
        self.image_id = int()
        self.client.force_login(user=self.user)

    def test_make_article(self):  #DB에 테스트
        assert self.article.content is 'testing'
        assert self.article.writer is self.user
        assert self.article.tags is self.tags

    def test_make_heart_to_article(self):  #DB에 테스트
        assert self.article.count_hearts is 1
        assert self.article_heart.user is self.user

    def test_post_article(self):
        if not os.path.isfile("test.jpg"):
            response = requests.get(
                "https://cdn.stocksnap.io/img-thumbs/960w/PSPD8YZLQH.jpg",
                stream=True)
            with open("test.jpg",
                      'wb') as file:  #sample image를 다른 server 에서 download
                if not response.ok:
                    assert False
                for buffer in response.iter_content(1024):
                    if not buffer:
                        break
                    file.write(buffer)

        with open('test.jpg', 'rb') as file:
            response = self.client.post('/articles/images/', {"image": file})

        self.image_id = json.loads((response.content).decode("utf-8"))['id']
        assert response.status_code is 201
        print(self.image_id)
        #이미지 업로드
        params = {
            'content': "testing_view",
            'tags': '["test_tag"]',
            'images_id': "[" + str(self.image_id) + "]"
        }
        response = self.client.post('/articles/', params)
        response_obj = json.loads((response.content).decode("utf-8"))
        assert response.status_code is 201
        assert response_obj.get('id') is 4
        #게시글 작성

    def tearDown(self):
        self.user.delete()
        #dt_now = datetime.datetime.now()
        #path_str = 'static/images/' + dt_now.strftime(
        #    '%y') + "/" + dt_now.strftime('%m') + "/" + dt_now.strftime(
        #        '%d') + "/" + "test.jpg"
        #os.remove(path_str)