from django.shortcuts import render,redirect

# Modelo datalink y formulario datalinkForm
from .models import datalink
from .forms import datalinkForm

# Clases necesarias para realizar la caracterizacion 
from CharacterizationApp import reflexion
from CharacterizationApp.Leer import Leer as leer

# libreria para realizar calculos y dataframe
import numpy as np
import pandas as pd
from github.MainClass import Github as gg

# Create your views here.


# vista Characterization:  Imprime todos los objetos del modelo datalink (id, nombre y link)
def Characterization(request):
    # guarda todos los objetos del modelo datalink en una variable para luego mostrarla en la vista
    datalinks = datalink.objects.all()
    return render(request, "CharacterizationApp/Characterization.html", {'datalinks':datalinks})

# vista add: realiza calculos necesarios para la caracterizacio.
#  Leer datos, calcula matrices y otros metodos necesarios.
def add (request):
    # guarda todos los objetos del modelo datalink en una variable 
    # para luego mostrarla en la vista    
    datalinks = datalink.objects.all()
    # obtener el id que se selecciono en el componente con el
    #  nombre DATACSV <select name="DATACSV"...>
    idd = request.POST.get("DATACSV")
    # En caso de que no se seleccione ninguna opcion (idd = valor vacio) 
    # redireccionar a la vista Characterization,
    #  en caso contrario (idd = con valor ), calcular la Characterization. 
    if(idd != ''):   
        print("Calculando los datos ... ")    
        # obtener los objetos del modelo datalink pasandole el id que se selecciono. 
        urliD = datalink.objects.get(id=idd)
        # obtener el valor del link del objeto urlid
        urlLink = urliD.link  
        #variables necesarias para la caracterizacion
        grado = 60
        alfa = 0.51360099729011
        beta = -0.176262299002633
        # leer el archivo csv pasandole el link 
        mLeer = leer(urlLink)      
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
        # a la variable nombre asignarle en nombre que tendra en el documento
        nombre= "data.csv"
        # asignar el nombre de la carpeta dentro de django y posteriormente agregarle el nombre del documento
        nombreMedia = 'media/' + nombre
        # transformar el dataframa en un archivo de tipo csv. 
        df.to_csv(nombreMedia, index=False)
        # asignar el token de github del repositorio
        token = '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'
        # utilizando la libreria de pygithub pasarle el token
        g = gg(token)
        # obtener el repositorio donde se subira la informacion, que  en todo caso utilizamos una repositorio de
        # una organizacion llamada Cloud-Dashboard y el repositorio se llamo Data-CSV
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
        # Subir a github
        git_prefix = ''
        git_file = git_prefix + nombre
        
        if git_file in all_files:
            contents = repo.get_contents(git_file)
            repo.update_file(contents.path, "committing files", content, contents.sha, branch="main")
            print(git_file + ' UPDATED')
        else:
            repo.create_file(git_file, "committing files", content, branch="main")
            print(git_file + ' CREATED')
    else:
        print("Seleccione un valor" + idd)
    return render (request,"CharacterizationApp/Characterization.html", {'datalinks':datalinks})



# vista agregarLink: carga plantilla de agregar por link a github
def agregarLink (request):
    # obtiene los valores del formulario datalinkForm 
    formulario = datalinkForm(request.POST or None, request.FILES or None)
    # si el formulario es valido entonces guardar los resultados y redireccionar a Characterization
    if formulario.is_valid():
        formulario.save()
        return redirect("Characterization")
    return render(request, "CharacterizationApp/agregarLink.html",{'formulario': formulario})



