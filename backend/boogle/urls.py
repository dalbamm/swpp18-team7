from django.urls import path
from boogle import views

urlpatterns = [
    path('signin', views.signin, name='signin'),
    path('signup', views.signup, name='signup'),
    path('user', views.user, name='user'),
    path('signout', views.signout, name='signout')
]
