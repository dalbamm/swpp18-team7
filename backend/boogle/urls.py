from django.urls import path
from boogle import views

urlpatterns = [
    path('signin', views.signin, name='signin'),
    path('signup', views.signup, name='signup'),
    path('user', views.user, name='user'),
    path('signout', views.signout, name='signout'),
    path('search/candidates/<str:title>',
         views.getCandidateList, name='getCandidateList'),
    path('search/isbn/<str:isbn>', views.getUsedbookList, name='getUsedbookList'),
    path('interested', views.interestedBook, name='interestedBook'),
    path('nothing', views.token, name='emptyRequest')
]
