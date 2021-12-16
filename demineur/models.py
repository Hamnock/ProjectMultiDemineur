from django.db import models
from django.forms import widgets
from django.forms.widgets import PasswordInput
from django import forms
from django.contrib.auth.models import User, AbstractBaseUser

# Create your models here.

class demineur(models.Model):
    Login = models.CharField(max_length=128, null=True)
    Password = models.CharField(default="", max_length=128)
    Date = models.DateField(auto_now=True)
    Score = models.IntegerField(default=0)
    Timer = models.FloatField(default=0.0)
    ScoreHautFait = models.IntegerField(default=0)
    def __str__(self):
        return self.Login

