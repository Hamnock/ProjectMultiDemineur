# Generated by Django 4.0 on 2021-12-13 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='demineur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Speudo', models.CharField(max_length=128)),
                ('Date', models.DateField(auto_now=True)),
                ('Timer', models.FloatField(default=0.0)),
                ('ScoreHautFait', models.IntegerField(default=0)),
            ],
        ),
    ]
