from django.forms import ModelForm, fields
from .models import demineur

class users(ModelForm):
    class Meta:
        model = demineur
        fields=["Speudo","MDP"]