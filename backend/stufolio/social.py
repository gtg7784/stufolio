from urllib.request import urlopen

from django.core.files.base import ContentFile
from social.utils import slugify

USER_FIELDS = ['email', 'nickname']


def create_user(strategy, details, user=None, *args, **kwargs): # create user
    if user:
        return {'is_new': False} # if account is already made

    fields = {
        'email': details.get('email'),
        'nickname': details.get('username')
    }

    if not fields: # if field is not proper
        return

    return {'is_new': True, 'user': strategy.create_user(**fields)} # create account


def update_profile_image(backend, response, uid, user, *args, **kwargs): 
    if backend.name == 'facebook':
        url = "http://graph.facebook.com/%s/picture?type=large" % response['id'] # get facebook profile image
        avatar = urlopen(url)
        user.image.save(
            slugify(user.email + " social") + '.jpg',
            ContentFile(avatar.read())) # set profile image
        user.save()
