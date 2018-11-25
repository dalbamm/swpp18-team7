from django.test import TestCase, Client
from django.contrib.auth.models import User
import json


class UserModelTestCase(TestCase):
    def test_signin(self):
        client = Client()

        # non-allowed method (get)
        response_get = client.get('/api/signin')
        self.assertEqual(response_get.status_code, 405)

        # allowed method (post)
        User.objects.create_user(username='test@test.com', password='Abcd1234')

        # wrong user info
        response_post_wrong = client.post('/api/signin', json.dumps({"email": "wrongID", "password": "wrongPassword"}),
                                          content_type='application/json')
        self.assertEqual(response_post_wrong.status_code, 401)

        # correct user infoco
        response_post_right = client.post(
            '/api/signin', json.dumps({'email': 'test@test.com', 'password': 'Abcd1234'}), content_type='application/json')
        self.assertEqual(response_post_right.status_code, 204)

    def test_signup(self):
        client = Client()

        # non-allowed method (get)
        response_get = client.get('/api/signup')
        self.assertEqual(response_get.status_code, 405)

        # allowed method (post)
        User.objects.create_user(username='test@test.com', password='Abcd1234')

        # account already exists
        response_post_fail = client.post('/api/signup', json.dumps(
            {'email': 'test@test.com', 'password': 'Abcd1234', 'phone': ''}), content_type='application/json')
        self.assertEqual(response_post_fail.status_code, 409)

        # successful signup
        response_post = client.post('/api/signup', json.dumps(
            {'email': 'test1@test.com', 'password': 'Abcd1234', 'phone': ''}), content_type='application/json')
        self.assertEqual(response_post.status_code, 201)

    def test_signout(self):
        client = Client()

        # non-allowed method (delete)
        response_delete = client.delete('/api/signout')
        self.assertEqual(response_delete.status_code, 405)

        # allowed method (get)
        testUser = User.objects.create_user(
            username='test@test.com', password='Abcd1234')

        # user is not signed in
        response_get_fail = client.get('/api/signout')
        self.assertEqual(response_get_fail.status_code, 401)

        # user is signed in
        client.post('/api/signin', json.dumps({'email': 'test@test.com',
                                               'password': 'Abcd1234'}), content_type='application/json')
        response_get = client.get('/api/signout')
        self.assertEqual(response_get.status_code, 204)

    def test_user(self):
        client = Client()

        # non-allowed method (delete)
        response_delete = client.delete('/api/user')
        self.assertEqual(response_delete.status_code, 405)

        # allowed method (get)
        testUser = User.objects.create_user(
            username='test@test.com', password='Abcd1234')
        client.post('/api/signin', json.dumps({'email': 'test@test.com',
                                               'password': 'Abcd1234'}), content_type='application/json')

        response_get = client.get('/api/user')
        self.assertEqual(json.loads(
            response_get.content)['email'], 'test@test.com')
