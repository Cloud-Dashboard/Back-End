from django.urls import path
from DashboardApp.views import Characterization
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('Characterization',Characterization,name='Characterization'),
      
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


