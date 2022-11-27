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


@admin.action(description='Generar un csv Caracterizado')
def create_student(self, request, queryset):
    
    for datas in queryset:
        dat = datalink(id=datas.id,link=datas.link,nombre=datas.nombre)
        

        link= datas.link
        nombre = datas.nombre

        dat = queryset.update(nombre=nombre)

        nombre = nombre + "_Caracterizado2.csv"
            

        grado = 60
        alfa = 0.51360099729011
        beta = -0.176262299002633
        # leer el archivo csv pasandole el link 
        mLeer = leer(link)      
        # obtener el listado de datos del csv
        datos = mLeer.getList()
        # calcular la caracterizacacion pasandole las varibles necesarias
        reflexion.ejecucionX(datos, grado, alfa, beta)
        # terminar el conteo de tiempo y ver el conteo Final
        
        #Pasar a csv
        x = np.arange(1, len(datos) + 1, 1)
        # obtener los datos normalizados del csv
        normalized = mLeer.getNormalized().values[2]
        # obtener los datos caracterizados del csv
        characterization = reflexion.getSalidas()

        dict = {"Time": x,"Normalized": normalized, "Characterization": characterization}

        df = pd.DataFrame(dict)

        nombreMedia = 'media/' + nombre
        
        df.to_csv(nombreMedia, index=False)

        token = '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'

        g = gg(token)
        repo = g.get_organization('Cloud-Dashboard').get_repo('Data-CSV')
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
        # Upload to github
        git_prefix = ''
        git_file = git_prefix + nombre
        ### THIS PART WORKS ###

        ### GET AN ERROR HERE BELOW ###
        if git_file in all_files:
            contents = repo.get_contents(git_file)
            repo.update_file(contents.path, "committing files", content, contents.sha, branch="main")
            print(git_file + ' UPDATED')
        else:
            repo.create_file(git_file, "committing files", content, branch="main")
            print(git_file + ' CREATED')
        
    
    self.message_user(request, ngettext(
        '%d se ha creado un nuevo csv caracterizado.',
        '%d se han creado varios csv caracterizados.',
        dat,
    ) % dat, messages.SUCCESS)
    
        
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['id', 'link','nombre']
    
    actions = [create_student]


admin.site.register(datalink,ArticleAdmin)

