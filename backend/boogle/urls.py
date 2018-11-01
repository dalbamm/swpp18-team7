from django.urls import path
from boogle import views

urlpatterns = [
    path('signin', views.signin, name='signin')
]
