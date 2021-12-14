from django.http.response import HttpResponse
from django.shortcuts import render 
from datetime import datetime
from django.http import HttpResponseRedirect


def index(request):
     return render(request, "index.html", context={"prenon": "Patric"})

def add(request):
    val1= int(request.POST["num1"])
    val2= int(request.POST["num2"])
    res = val1 + val2
    return render(request, "index.html", context={"result": res})


def name(request):
     return render(request, "name.html", context={"prenon": "Patric"})