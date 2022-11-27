from django import forms 
from .models import datalink

# formulario donde se extrae Todos los campos del modelo "datalink" (id,link y nombre) 
class datalinkForm(forms.ModelForm):
    class Meta:
        model= datalink
        fields = '__all__'
 
 