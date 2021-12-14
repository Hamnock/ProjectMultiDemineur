from django.urls import path
from .views import index, name, add

urlpatterns = [
    path('', index , name="demineur-index"),
    path('name', name, name="page ADD"),
    path('', index, name="page index"),
    path('add', add, name="page ADD"),
]
