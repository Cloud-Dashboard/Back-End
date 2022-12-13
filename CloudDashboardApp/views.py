from django.shortcuts import render


# Create your views here.

#Renderizar la plantilla de dashboard pasandole el contexto a travez del render
def dashboard(request):
    return render(request, "CloudDashboardApp/dashboard.html")
    
#Renderizar la plantilla de tablas pasandole el contexto a travez del render
def tablas(request):
    return render(request, "CloudDashboardApp/tablas.html")
#Renderizar la plantilla de estadistica pasandole el contexto a travez del render
def estadistica(request):
    return render(request, "CloudDashboardApp/estadistica.html")

#Renderizar la plantilla de about pasandole el contexto a travez del render
def about(request):
    return render(request, "CloudDashboardApp/about-us.html")
  