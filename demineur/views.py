from django.http.response import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import render , redirect
from datetime import datetime
from django.http import HttpResponseRedirect
from demineur.models import demineur
from .formulaire import users


def index(request):
     return render(request, "index.html", context={"prenon": "Patric"})

def add(request):
    val1= int(request.POST["num1"])
    val2= int(request.POST["num2"])
    res = val1 + val2
    return render(request, "index.html", context={"result": res})


def name(request):
     return render(request, "name.html", context={"prenon": "Patric"})

def formulaire(request):
     if request.method == "POST":
          
          form = users(request.POST).save()
          
          return redirect("/demineur")
     else:
          form = users()
     return render(request, 'formulaire.html',{"form":form})