from django.shortcuts import render 
from datetime import datetime
from django.http import HttpResponseRedirect
from .forms import NameForm

def index(request):
     return render(request, "index.html", context={"prenon": "Patric"})

def add(request):
    val1= int(request.POST["num1"])
    val2= int(request.POST["num2"])
    res = val1 + val2
    return render(request, "index.html",{"result": res})