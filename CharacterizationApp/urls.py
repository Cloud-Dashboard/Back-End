from django.urls import path
# from CharacterizationApp.views import Characterization, add, agregarLink
# from CharacterizationApp.views import dashboardCharacterization

from django.conf import settings
from django.conf.urls.static import static


# urlpatterns en CharacterizationApp: hace referencia los templates de la misma app
urlpatterns = [
    
]

# Hace referencia a los archivos media estaticos configurado en settings
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


