from django.shortcuts import render
from DashboardApp.Main import main
from DashboardApp.forms import HomeForm


# Create your views here.
def Characterization(request):
    a="nose"
    print("aiuda")
    return render(request, "DashboardApp/Characterization.html",{'a':a})


def post (request):
    form = HomeForm()
    if form.is_valid():
        text = form.cleaned_data('post')
    
    arg ={'form':form,'text':text}
    return render (request,"DashboardApp/Characterization.html",arg)


def add (request):
    # val1 = int(request.POST["num1"])
    # val2 = int(request.POST["num2"])
    # res = val1+val2
    # return render (request,"DashboardApp/result.html",{'resultado':res})
    main.ejecutar()

    return render (request,"DashboardApp/Result.html")






    