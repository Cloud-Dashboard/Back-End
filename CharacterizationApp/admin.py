from django.contrib import admin
from CharacterizationApp.models import datalink

# Register your models here.


from django.contrib import messages
from django.utils.translation import ngettext

# Clases necesarias para realizar la caracterizacion 
from CharacterizationApp import reflexion
from CharacterizationApp.Leer import Leer as leer

# libreria para realizar calculos y dataframe
import numpy as np
import pandas as pd
from github.MainClass import Github as gg

# Metodo action "Generar un csv Caracterizado"
@admin.action(description='Generar un csv Caracterizado')
def create_caracterizado(self, request, queryset):
    # El usuario selecciona una opcion y se manda en el queryset
    for datas in queryset:
        # El dat contiene el objeto seleccionado que se pasa del queryset correspondiente
        dat = datalink(id=datas.id,link=datas.link,nombre=datas.nombre)
        
        # Se asiganan los valores a una variable del link, nombre, luego se actualiza  nombre
        link= datas.link
        nombre = datas.nombre
        dat = queryset.update(nombre=nombre)
        # posteriormente al nombre del datalink se le agrega el texto de _Caracterizado.csv
        nombre = nombre + "_Caracterizado.csv"
           
        # Varaiable y metodo necesarios para calcular la caracterizacion
        grado = 60
        alfa = 0.51360099729011
        beta = -0.176262299002633
        # leer el archivo csv pasandole el link 
        mLeer = leer(link)      
        # obtener el listado de datos del csv
        datos = mLeer.getList()
        # calcular la caracterizacacion pasandole las varibles necesarias
        reflexion.ejecucionX(datos, grado, alfa, beta)
        #Pasar a csv
        x = np.arange(1, len(datos) + 1, 1)
        # obtener los datos normalizados del csv
        normalized = mLeer.getNormalized().values[2]
        # obtener los datos caracterizados del csv
        characterization = reflexion.getSalidas()
        # almacenar la informacion de las variables x, normalized y characterization en un diccionario
        dict = {"Time": x,"Normalized": normalized, "Characterization": characterization}
        # utilizando la libreria de pandas crear un dataframe y pasarle el diccionario. 
        df = pd.DataFrame(dict)
        # asignar el nombre de la carpeta dentro de django y posteriormente agregarle el nombre del documento
        nombreMedia = 'media/' + nombre
        # transformar el dataframa en un archivo de tipo csv. 
        df.to_csv(nombreMedia, index=False)
        # asignar el token de github del repositorio
        token = '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'
        # utilizando la libreria de pygithub pasarle el token
        g = gg(token)
        # obtener el repositorio donde se subira la informacion, que  en todo caso utilizamos una repositorio de
        # una organizacion llamada Cloud-Dashboard y el repositorio se llamo Characterization-CSV
        repo = g.get_organization('Cloud-Dashboard').get_repo('Characterization-CSV')
        all_files = []
        contents = repo.get_contents("")
        while contents:
            file_content = contents.pop(0)
            if file_content.type == "dir":
                contents.extend(repo.get_contents(file_content.path))
            else:
                file = file_content
                all_files.append(str(file).replace('ContentFile(path="', '').replace('")', ''))
        with open(nombreMedia, 'r') as file:
            content = file.read()
        # Subir a  github
        git_prefix = ''
        git_file = git_prefix + nombre
        # Realizar las comparaciones correspondientes: Si el archiv ya existe actualizar si no crearlo y mandar un mensaje correspondiente
        if git_file in all_files:
            contents = repo.get_contents(git_file)
            repo.update_file(contents.path, "committing files", content, contents.sha, branch="main")
            self.message_user(request, ngettext(
                '%d se ha actualizado un nuevo csv caracterizado.',
                dat,
            ) % dat, messages.SUCCESS)
        else:
            repo.create_file(git_file, "committing files", content, branch="main")
            self.message_user(request, ngettext(
                '%d se ha creado un nuevo csv caracterizado.',
                dat,
            ) % dat, messages.SUCCESS)
        break        
    
# metodo que cambia la vista del panel admin con los datos correspondientes que se van guardando
# Y agregar el action create en el modelAdmin
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['id', 'link','nombre']
    actions = [create_caracterizado]

# registrar el modelo datalink y el ArticleAdmin
admin.site.register(datalink,ArticleAdmin)

