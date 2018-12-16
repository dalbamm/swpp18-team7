from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    title = models.CharField(
    	max_length=100,
    	default='')
    isbn = models.CharField(max_length=20)


class Account(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    interestedBooks = models.ManyToManyField(
        Book
    )
