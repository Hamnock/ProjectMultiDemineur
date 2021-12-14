from django import forms
from django.forms.widgets import PasswordInput
from .models import demineur

class users(forms.ModelForm):

    Login = forms.CharField(widget=forms.TextInput(attrs={
        "class":"input",
        "type":"text",
        "placeholder":" entret Login",
    }), label="Login")

    Password = forms.CharField(widget=forms.TextInput(attrs={
        "class":"input",
        "type":"password",
        "placeholder":"enter password",
    }))
    class Meta:
        model = demineur
        fields=["Login","Password"]
