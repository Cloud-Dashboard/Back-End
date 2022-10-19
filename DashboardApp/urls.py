from django.urls import path
from DashboardApp.views import Characterization, add
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('Characterization',Characterization,name='Characterization'),
    path('add',add,name='add'),
      
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


