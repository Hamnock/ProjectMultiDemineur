from django.urls import path
from . import views
from .views import index, name, singup, NormalMode,login_user,iflogin

urlpatterns = [
    path('', index , name="demineur-index"),
    path('login', login_user, name="page login"),
    path('iflogin', iflogin, name="page iflogin"),
    path('name', name, name="page name"),
    path('NormalMode', NormalMode, name="page NormalMode"),
    path('singup', singup, name="page formulaire"),
    path('logout_user', views.logout_user, name="logout"),
]
