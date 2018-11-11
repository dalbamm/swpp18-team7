from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
import json


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['email']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            userJson = json.dumps({
                "id": user.id,
                "email": user.username,
                "password": user.password,
                "name": "no_name_field_yet",
                "signedIn": user.is_authenticated
            })
            return HttpResponse(userJson, status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())

        email = req_data['email']
        password = req_data['password']
        phone = req_data['phone']

        if User.objects.filter(username=email).exists():
            return HttpResponse('An account already exists with email {:}'.format(email), status=418)
        else:
            User.objects.create_user(username=email, password=password)
            return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def user(request):
    if request.method == 'GET':
        user = request.user

        resp_json = json.dumps({
            "id": user.id,
            "email": user.username,
            "password": user.password,
            "name": "no_name_field_yet",
            "signed_in": user.is_authenticated
        })

        return HttpResponse(resp_json)
    else:
        # TODO add POST method
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
