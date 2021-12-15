from django.urls import path
from .views import index, name, add, singup, NormalMode,login_user,iflogin

urlpatterns = [
    path('', index , name="demineur-index"),
    path('login', login_user, name="page login"),
    path('iflogin', iflogin, name="page iflogin"),
    path('name', name, name="page name"),
    path('NormalMode', NormalMode, name="page NormalMode"),
    path('add', add, name="page ADD"),
    path('singup', singup, name="page formulaire"),
]
