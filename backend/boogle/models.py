from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    title = models.CharField(
    	max_length=100,
    	default='')
    isbn = models.CharField(max_length=20)
    author = models.CharField(max_length=30)
    publisher = models.CharField(max_length=20)
    publishedYear = models.IntegerField()
    marketPrice = models.IntegerField()
    imageLink = models.CharField(max_length=200, null=True)


class Account(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    interestedBooks = models.ManyToManyField(
        Book
    )


class Article(models.Model):
    site = models.CharField(
        max_length=30,
        default='')
    title = models.CharField(
        max_length=100,
        default='')
    author = models.CharField(
        max_length=30,
        default='')
    price = models.IntegerField()
    link = models.CharField(
        max_length=200,
        default='',
        null=True)
    content = models.TextField(null=True)
    articleAuthor = models.CharField(
        max_length=30,
        default='',
        null=True)
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        null=True
    )
    bookStatus = models.CharField(
        max_length=10,
        default='',
        null=True)


class Comment(models.Model):
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE
    )
    content = models.TextField()
    commentAuthor = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
