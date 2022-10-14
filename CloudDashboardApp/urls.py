from django.urls import path
from CloudDashboardApp.views import lista
from CloudDashboardApp.views import data13Widgets,data4TalbesB,index,data12UiTyp,data11UiBut,data10UiTabs,data9IuSwi,data8UiP,data7UiModals,data3TablesD,datauiAlerts,data2formsB,data1ChartsF,data0ChartsC
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',index,name='index'),
    path('lista',lista,name="lista"),
    path('data13Widgets',data13Widgets,name='data13Widgets'),
    path('data12UiTyp',data12UiTyp,name='data12UiTyp'),
    path('data11UiBut',data11UiBut,name='data11UiBut'),
    path('data4TalbesB',data4TalbesB,name='data4TalbesB'),
    path('data10UiTabs',data10UiTabs,name='data10UiTabs'),
    path('data9IuSwi',data9IuSwi,name='data9IuSwi'),
    path('data8UiP',data8UiP,name='data8UiP'),
    path('data7UiModals',data7UiModals,name='data7UiModals'),
    path('data3TablesD',data3TablesD,name='data3TablesD'),
    path('datauiAlerts',datauiAlerts,name='datauiAlerts'),
    path('data2formsB',data2formsB,name='data2formsB'),
    path('data1ChartsF',data1ChartsF,name='data1ChartsF'),
    path('data0ChartsC',data0ChartsC,name='data0ChartsC'),
    
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


