from django.db import models


# Create your models here.


# modelo llamado "datalink" con los campos de id, link y nombre 
class datalink(models.Model):
    id = models.AutoField(primary_key=True)
    link=models.CharField(max_length=200, null=True, unique=True,)
    nombre= models.CharField(max_length=15, null=True, unique=True)






