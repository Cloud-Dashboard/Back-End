from django.shortcuts import render, HttpResponse


from CloudDashboardApp.models import Document
from CloudDashboardApp.forms import DocumentForm

def lista(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()

            # Redirect to the document list after POST
    else:
        form = DocumentForm() # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    # Render list page with the documents and the form
    return render(request,'CloudDashboardApp/list.html',{'documents': documents, 'form': form})

    
# Create your views here.

def data0ChartsC(request):
    return render(request, "CloudDashboardApp/charts-chartjs.html")
def data1ChartsF(request):
    return render(request, "CloudDashboardApp/charts-flot.html")
def data2formsB(request):
    return render(request, "CloudDashboardApp/forms-basic.html")
def index(request):
    return render(request, "CloudDashboardApp/index.html")
def data4TalbesB(request):
    return render(request, "CloudDashboardApp/tables-basic.html")
def data3TablesD(request):
    return render(request, "CloudDashboardApp/tables-data.html")
def datauiAlerts(request):
    return render(request, "CloudDashboardApp/ui-alerts.html")
def data7UiModals(request):
    return render(request, "CloudDashboardApp/ui-modals.html")
def data8UiP(request):
    return render(request, "CloudDashboardApp/ui-progressbar.html")
def data9IuSwi(request):
    return render(request, "CloudDashboardApp/ui-switches.html")
def data10UiTabs(request):
    return render(request, "CloudDashboardApp/ui-tabs.html")
def data11UiBut(request):
    return render(request, "CloudDashboardApp/ui-buttons.html")
def data12UiTyp(request):
    return render(request, "CloudDashboardApp/ui-typgraphy.html")
def data13Widgets(request):
    return render(request, "CloudDashboardApp/widgets.html")
















