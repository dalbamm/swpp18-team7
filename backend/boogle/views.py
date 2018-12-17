from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.core import mail
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from crawler import Crawler
from boogle.models import Account, Book
import json


@ensure_csrf_cookie
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['email']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        print("signin user: ", user)
        if user is not None:
            login(request, user)
            userJson = json.dumps({
                "id": user.id,
                "email": user.username,
                "password": user.password,
                "name": "no_name_field_yet",
                "signedIn": user.is_authenticated
            })
            print('userJson:', userJson)

            return HttpResponse(userJson, status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())

        email = req_data['email']
        password = req_data['password']
        phone = req_data['phone']

        if User.objects.filter(username=email).exists():
            return HttpResponse('An account already exists with this email.', status=409)
        else:
            newUser = User.objects.create_user(
                username=email, password=password)
            newAccount = Account(user=newUser)
            newAccount.save()

            return HttpResponse(status=201)
    elif request.method == 'OPTIONS':
        response = HttpResponse()
        response['allow'] = ['POST', 'OPTIONS']
        return response
    else:
        return HttpResponseNotAllowed(['POST', 'OPTIONS'])


def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


def user(request):
    if request.method == 'GET':
        user = request.user

        resp_json = json.dumps({
            "id": user.id,
            "email": user.username,
            "password": 'NOPE',
            "name": "no_name_field_yet",
            "signed_in": user.is_authenticated
        })

        return HttpResponse(resp_json)

    elif request.method == 'PUT':
        user = request.user

        req_data = json.loads(request.body.decode())

        if not user.username == req_data['email']:
            if User.objects.filter(username=req_data['email']).exists():
                return HttpResponse('An account already exists with this email.', status=409)
            else:
                user.username = req_data['email']

        user.save()
        print('username after save: ', user.username)

        resp_json = json.dumps({
            "id": user.id,
            "email": user.username,
            "password": user.password,
            "name": "no_name_field_yet",
            "signed_in": user.is_authenticated
        })

        return HttpResponse(resp_json, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


def getCandidateList(request, **kwargs):
    if request.method == 'GET':
        title = kwargs['title']

        crawler = Crawler.Crawler()
        crawler.openDriver()
        data = crawler.getCandidateList(title)
        crawler.closeDriver()

        return JsonResponse(data, safe=False, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


def usedbook(request):
    if request.method == 'POST':
        user = request.user
        req_data = json.loads(request.body.decode())

        if not user.username == req_data['email']:
            if User.objects.filter(username=req_data['email']).exists():
                return HttpResponse('An account already exists with this email.', status=409)
            else:
                user.username = req_data['email']

        user.save()
        print('username after save: ', user.username)

        resp_json = json.dumps({
            "id": user.id,
            "email": user.username,
            "password": user.password,
            "name": "no_name_field_yet",
            "signed_in": user.is_authenticated
        })

        return HttpResponse(resp_json, status=200)

    else:
        return HttpResponseNotAllowed(['POST'])


def getUsedbookList(request, **kwargs):
    if request.method == 'GET':
        isbn = kwargs['isbn']

        crawler = Crawler.Crawler()
        crawler.openDriver()
        data = crawler.getUsedbookData(isbn)
        crawler.closeDriver()

        return JsonResponse(data, safe=False, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


def interestedBooks(request):
    if request.method == 'GET':
        user = Account.objects.get(user=request.user)

        bookListQuerySet = user.interestedBooks.values()
        bookList = [
            {'title': book['title'], 'ISBN': book['isbn']}
            for book in bookListQuerySet
        ]

        return JsonResponse(bookList, safe=False, status=200)

    elif request.method == 'POST':
        req_data = json.loads(request.body.decode())

        account = Account.objects.get(user=request.user)
        isbn = req_data['isbn']
        title = req_data['title']

        if not Book.objects.filter(isbn=isbn).exists():
            newBook = Book(isbn=isbn, title=title)
            newBook.save()

        book = Book.objects.get(isbn=isbn)

        if account.interestedBooks.filter(isbn=isbn).exists():
            return HttpResponse(status=409)

        account.interestedBooks.add(book)
        account.save()

        return HttpResponse(status=204)

    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])


def interestedBook(request, **kwargs):
    if request.method == 'DELETE':
        account = Account.objects.get(user=request.user)
        isbn = kwargs['isbn']

        book = account.interestedBooks.get(isbn=isbn)
        account.interestedBooks.remove(book)
        account.save()

        return HttpResponse(status=204)

    else:
        return HttpResponseNotAllowed(['DELETE'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


def sendAlert(isbn, title, article_id):
    subject = 'Boogle 중고책 글 알림: 새 글이 등록됐어요!'
    link = 'http://54.180.117.120/sale/{:}'.format(article_id)
    content = 'Boogle 에서 알림 받기를 요청하신 책 {:} 에 대한 새로운 글이 등록됐습니다. 다음 주소에서 확인해 보세요: {:}'.format(
        title, link)
    book = Book.objects.get(isbn=isbn)
    recipientList = [
        User.objects.get(id=account['user_id']).username for account in book.notificationRecipients.values()]

    print(recipientList)
    mail.send_mail(subject, content,
                   'boogle.alert@gmail.com', recipientList)
