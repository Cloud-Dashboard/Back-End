from dataclasses import fields
import imp
from django import forms 
from .models import datalink

class datalinkForm(forms.ModelForm):
    class Meta:
        model= datalink
        fields = '__all__'
    
        

