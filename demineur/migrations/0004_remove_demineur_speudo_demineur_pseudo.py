# Generated by Django 4.0 on 2021-12-14 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demineur', '0003_demineur_mdp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='demineur',
            name='Speudo',
        ),
        migrations.AddField(
            model_name='demineur',
            name='Pseudo',
            field=models.CharField(default=0, max_length=128),
            preserve_default=False,
        ),
    ]
