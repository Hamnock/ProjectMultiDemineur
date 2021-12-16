from django import forms
from django.http.response import HttpResponse
from django.shortcuts import render , redirect
from datetime import datetime
from django.http import HttpResponseRedirect
from .models import demineur
from .formulaire import users
from django.contrib.auth import authenticate,login, logout
from django.contrib import messages

def index(request):
     return render(request, "index.html")

def NormalMode(request):
     return render(request, 'NormalMode.html')


def table(request):
     all_table = demineur.objects.all
     return render(request, "table.html",{"all":all_table} )

def iflogin(request):
     return render(request, "iflogin.html" )

#request pour un utilisateur dans le demineur
def singup(request):
     if request.method == "POST":
          
          form = users(request.POST or None)
          if form.is_valid():
               form.save()
          return redirect("/")
     else:
          form = users()
     return render(request, 'singup.html',{"form":form})

#request pour pouvoir se connecter en fonction des users deja creer
def login_user(request):
     if request.method == "POST":
       username = request.POST["username"]
       password = request.POST["password"]
       user = authenticate(request,username=username,password=password)
       if user is not None:
               login(request, user)
               return redirect("/iflogin")
       else:
               return redirect("/login")
     else:     
          return render(request, 'login.html')


def logout_user(request):
          logout(request)
          return redirect('/')