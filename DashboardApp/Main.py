from DashboardApp import reflexion
from DashboardApp.Leer import Leer as leer
import time
# import matplotlib.pyplot as plt
# import numpy as np

class main():

    def ejecutar():  
        inicio = time.time()
        #url = ".\\Datasets\\COVID19.csv"
        #url = ".\\Datasets\\Dengue.csv"
        #url = ".\\Datasets\\Influenza.csv"
        #
        url = ".\\Datasets\\Sarampion.csv"
        grado = 60
        alfa = 0.51360099729011
        beta = -0.176262299002633
        mLeer = leer(url)
        datos = mLeer.getList()
        reflexion.ejecucionX(datos, grado, alfa, beta)
        fin = time.time()
        print("Execution time:", fin - inicio)

        # x = np.arange(1, len(datos) + 1, 1)
        # y = mLeer.getNormalized().values[2]
        # y2 = reflexion.getSalidas()

        # plt.plot(x, y, label='Normalized')
        # plt.plot(x, y2, label='Characterization')
        # plt.xlabel('Días')
        # plt.ylabel('Datos')
        # plt.title('Characterization')
        # plt.legend()
        # plt.show()

            