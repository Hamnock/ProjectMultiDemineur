from django.urls import path
from .views import index, name, add, formulaire

urlpatterns = [
    path('', index , name="demineur-index"),
    path('name', name, name="page name"),
    path('', index, name="page index"),
    path('add', add, name="page ADD"),
    path('formulaire', formulaire, name="page formulaire"),
]
