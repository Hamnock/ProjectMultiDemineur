from django.urls import path
from .views import index, name, add, singup, NormalMode

urlpatterns = [
    path('', index , name="demineur-index"),
    path('name', name, name="page name"),
    path('NormalMode', NormalMode, name="page NormalMode"),
    path('add', add, name="page ADD"),
    path('singup', singup, name="page formulaire"),
]
