from django.shortcuts import render, HttpResponse

  
# Create your views here.

def index(request):
    return render(request, "CloudDashboardApp/index.html")
def Tables(request):
    return render(request, "CloudDashboardApp/Tables.html")
def Statistics(request):
    return render(request, "CloudDashboardApp/Statistics.html")