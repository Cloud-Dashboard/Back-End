from django.shortcuts import render,redirect
from .models import datalink
from .forms import datalinkForm

# Create your views here.
def Characterization(request):
    datalinks = datalink.objects.all()
    # print(datalinks)
    return render(request, "DashboardApp/Characterization.html", {'datalinks':datalinks})

from DashboardApp import reflexion
from DashboardApp.Leer import Leer as leer
import time

# Realiza calculos necesarios para la caracterizacio. Leer datos, calcula matrices, calcula tiempo de ejecucion.
def add (request):
    datalinks = datalink.objects.all()
    
    inicio = time.time()  
     
    idd = request.POST.get("DATACSV")

    if(idd==''):
        return redirect('Characterization')        
    else:
        urliD = datalink.objects.get(id=idd)
        urlLink=urliD.link  
        # print("obteniendo datos de urlLink")
        # print(urlLink)
        # urlNombre=urliD.nombre
        grado = 60
        alfa = 0.51360099729011
        beta = -0.176262299002633
        # print("Leyendo datos de")
        # print(urlNombre)
        mLeer = leer(urlLink)      
        datos = mLeer.getList()
        # print("calculando MatrizR")
        dMatrizR = reflexion.ejecucionX(datos, grado, alfa, beta)
        fin = time.time()
        Final= fin-inicio


    return render (request,"DashboardApp/Characterization.html", {'dMR':dMatrizR,'Final':Final,'datalinks':datalinks})

# carga plantilla de agregar por link a github
def agregarLink (request):
    formulario = datalinkForm(request.POST or None, request.FILES or None)
    if formulario.is_valid():
        formulario.save()
        return redirect("Characterization.html")
    return render(request, "DashboardApp/agregarLink.html",{'formulario': formulario})





    