from django.shortcuts import render 
from datetime import datetime

def index(request):
     return render(request, "index.html", context={"prenon": "YNname","date" : datetime.today()})

def name(request):
    if request.method == "POST":
        return print("YNname")