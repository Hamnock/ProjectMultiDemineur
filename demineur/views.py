from django.http.response import HttpResponse
from django.shortcuts import render , redirect
from datetime import datetime
from django.http import HttpResponseRedirect
from demineur.models import demineur
from .formulaire import users
from django.contrib.auth import authenticate,login, logout
from django.contrib import messages

def index(request):
     return render(request, "index.html", context={"prenon": "Patric"})

def add(request):
    val1= int(request.POST["num1"])
    val2= int(request.POST["num2"])
    res = val1 + val2
    return render(request, "index.html", context={"result": res})


def name(request):
     return render(request, "name.html", context={"prenon": "Patric"})

def NormalMode(request):
     return render(request, "NormalMode.html" )

def iflogin(request):
     return render(request, "iflogin.html" )


def singup(request):
     if request.method == "POST":
          
          form = users(request.POST).save()
          
          return redirect("/")
     else:
          form = users()
     return render(request, 'singup.html',{"form":form})


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