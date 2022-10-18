import pandas as pd


class Leer:
    def __init__(self, url):
        self.url = url
        self.lista = []
        self.leer()

    def leer(self):
        csv = pd.read_csv(self.url)
        for i in range(len(csv)):
            self.lista.append([])
            for j in range(len(csv.columns)):
                self.lista[i].append(csv.values[i][j])

    def getList(self):
        return self.lista

    def getNormalized(self):
        csv = pd.read_csv(self.url)
        return csv.transpose()
