from django.urls import path
from CloudDashboardApp.views import Tables,Statistics
from CloudDashboardApp.views import index, TableCOVID19
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',index,name='index'),
    path('Tables',Tables,name='Tables'),
    path('Statistics',Statistics,name='Statistics'),
    path('TableCOVID19',TableCOVID19,name='TableCOVID19'),

    
    
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


