from django.shortcuts import render
from DashboardApp.Main import main

# Create your views here.
def Characterization(request):
    a="nose"
    return render(request, "DashboardApp/Characterization.html",{'a':a})
