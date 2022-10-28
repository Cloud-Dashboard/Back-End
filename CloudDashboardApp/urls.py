from django.urls import path
from CloudDashboardApp.views import Tables,Statistics
from CloudDashboardApp.views import index
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',index,name='index'),
    path('Tables',Tables,name='Tables'),
    path('Statistics',Statistics,name='Statistics'),  
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


