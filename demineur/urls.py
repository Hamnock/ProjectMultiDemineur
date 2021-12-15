from django.urls import path
from .views import index, name, add, formulaire, NormalMode

urlpatterns = [
    path('', index , name="demineur-index"),
    path('name', name, name="page name"),
    path('NormalMode', NormalMode, name="page name"),
    path('add', add, name="page ADD"),
    path('formulaire', formulaire, name="page formulaire"),
]
