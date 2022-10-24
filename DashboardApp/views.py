from django.shortcuts import render,redirect
from .models import datalink
from .forms import datalinkForm

from DashboardApp import reflexion
from DashboardApp.Leer import Leer as leer
import time

import numpy as np

# Create your views here.


def Characterization(request):
    datalinks = datalink.objects.all()
    # print(datalinks)
    return render(request, "DashboardApp/Characterization.html", {'datalinks':datalinks})

# Realiza calculos necesarios para la caracterizacio. Leer datos, calcula matrices, calcula tiempo de ejecucion.
def add (request):
    datalinks = datalink.objects.all()
         
    idd = request.POST.get("DATACSV")

    if(idd==''):
        return redirect('Characterization')        
    else:
        inicio = time.time()  
        urliD = datalink.objects.get(id=idd)
        urlLink = urliD.link  
        
        grado = 60
        alfa = 0.51360099729011
        beta = -0.176262299002633
        
        mLeer = leer(urlLink)      
        datos = mLeer.getList()
        dMatrizR = reflexion.ejecucionX(datos, grado, alfa, beta)
        fin = time.time()
        Final= fin-inicio

        y = mLeer.getNormalized().values[2]
        y2 = reflexion.getSalidas()



    return render (request,"DashboardApp/Characterization.html", {'y':y,'y2':y2,'dMR':dMatrizR,'Final':Final,'datalinks':datalinks})

# carga plantilla de agregar por link a github
def agregarLink (request):
    formulario = datalinkForm(request.POST or None, request.FILES or None)
    if formulario.is_valid():
        formulario.save()
        return redirect("Characterization.html")
    return render(request, "DashboardApp/agregarLink.html",{'formulario': formulario})





    