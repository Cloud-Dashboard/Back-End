from django.urls import path
from DashboardApp.views import Characterization, add, agregarLink
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('Characterization',Characterization,name='Characterization'),
    path('add',add,name='add'),
    path('agregarLink',agregarLink,name='agregarLink'),  
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


