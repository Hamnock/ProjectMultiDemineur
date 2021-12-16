from django.urls import path
from . import views
from .views import index, singup, NormalMode,login_user,iflogin,table

urlpatterns = [
    path('', index , name="demineur-index"),
    path('login', login_user, name="page login"),
    path('table', table, name="page tableau"),
    path('iflogin', iflogin, name="page iflogin"),
    path('NormalMode', NormalMode, name="page NormalMode"),
    path('singup', singup, name="page formulaire"),
    path('logout_user', views.logout_user, name="logout"),
]
