from django import forms

class NameForm(forms.Form):
    YNname = forms.CharField(label='Your name', max_length=100)