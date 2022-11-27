import pandas as pd


# clase para leer archivo csv
class Leer:
    def __init__(self, url):
        self.url = url
        self.lista = []
        self.leer()

    # leer archivo csv con libreria de pandas y  guardas datos en una lista. 
    def leer(self):
        csv = pd.read_csv(self.url)
        for i in range(len(csv)):
            self.lista.append([])
            for j in range(len(csv.columns)):
                self.lista[i].append(csv.values[i][j])

    # obtener el listado de datos
    def getList(self):
        return self.lista

    # leer los datos del csv y obtener los datos normalizados 
    def getNormalized(self):
        csv = pd.read_csv(self.url)
        return csv.transpose()
