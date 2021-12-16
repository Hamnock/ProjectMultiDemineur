from django.urls import path
from . import views
from .views import index, singup, NormalMode,login_user,iflogin,table,hehmode

urlpatterns = [
    path('', index , name="demineur-index"),
    path('login', login_user, name="page login"),
    path('hehmode', hehmode, name="page hehmode"),
    path('table', table, name="page tableau"),
    path('iflogin', iflogin, name="page iflogin"),
    path('NormalMode', NormalMode, name="page NormalMode"),
    path('singup', singup, name="page formulaire"),
    path('logout_user', views.logout_user, name="logout"),
]
