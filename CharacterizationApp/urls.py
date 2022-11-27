from django.urls import path
from CharacterizationApp.views import Characterization, add, agregarLink
from django.conf import settings
from django.conf.urls.static import static


# urlpatterns en CharacterizationApp = hace referencia los templates de la misma app


urlpatterns = [
    path('Characterization',Characterization,name='Characterization'),
    path('add',add,name='add'),
    path('agregarLink',agregarLink,name='agregarLink'),  
]

# Hace referencia a los archivos estaticos configurado en settings
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


