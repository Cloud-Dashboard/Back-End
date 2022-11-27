from django.urls import path
from CloudDashboardApp.views import dashboard,estadistica,about,tablas
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    path('',dashboard,name='dashboard'),  
    path('estadistica',estadistica,name='estadistica'),  
    path('tablas',tablas,name='tablas'),
    path('about',about,name='about'),
      

 
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


