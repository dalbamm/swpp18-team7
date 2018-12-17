from django.urls import path
from boogle import views

urlpatterns = [
    path('signin', views.signin, name='signin'),
    path('signup', views.signup, name='signup'),
    path('user', views.user, name='user'),
    path('signout', views.signout, name='signout'),
    path('search/candidates/<str:title>',
         views.getCandidateList, name='getCandidateList'),
    path('search/isbn/', views.usedbook, name='usedbook'),
    path('search/isbn/<str:isbn>', views.getUsedbookList, name='getUsedbookList'),
    path('interested', views.interestedBooks, name='interestedBooks'),
    path('interested/<str:isbn>', views.interestedBook, name='interestedBook'),
    path('article', views.article, name='article'),
    path('nothing', views.token, name='emptyRequest')
]
