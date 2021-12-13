from django.db import models

# Create your models here.

class demineur(models.Model):
    Speudo = models.CharField(max_length=128)
    Date = models.DateField(auto_now=True)
    Score = models.IntegerField
    Timer = models.FloatField(default=0.0)
    ScoreHautFait = models.IntegerField(default=0)
