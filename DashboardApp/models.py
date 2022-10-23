from django.db import models

# Create your models here.


class datalink(models.Model):
    id = models.AutoField(primary_key=True)
    link=models.CharField(max_length=200, null=True)
    nombre= models.CharField(max_length=15, null=True)

    # def __str__(self) -> str:
    #     fila = "Link: " +self.link  + " ----- " + "Nombre: " + self.nombre
    #     return fila
   