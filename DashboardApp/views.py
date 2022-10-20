from django.shortcuts import render



# Create your views here.
def Characterization(request):
    
    return render(request, "DashboardApp/Characterization.html")

from DashboardApp import reflexion
from DashboardApp.Leer import Leer as leer
import time

def add (request):
   
    inicio = time.time()
    
    #url = "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/COVID19.csv"
    #url = "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Dengue.csv"
    #url = "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Influenza.csv"
    url = "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Sarampion.csv"
    
    grado = 60
    alfa = 0.51360099729011
    beta = -0.176262299002633
    print("Leyendo datos")
    mLeer = leer(url)      
    datos = mLeer.getList()
    print("calculando MatrizR")
    dMatrizR = reflexion.ejecucionX(datos, grado, alfa, beta)
    fin = time.time()
    Final= fin-inicio
    return render (request,"DashboardApp/Characterization.html", {'dMR':dMatrizR, 'Final':Final})






    