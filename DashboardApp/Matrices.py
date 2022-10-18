from DashboardApp import operaciones
import math
from DashboardApp import Ortogonal as ort


class Matrices:

    def __init__(self, dDatos, iGrado, alpha, beta):
        self.dDatos = dDatos
        self.iGrado = iGrado
        self.alpha = alpha
        self.beta = beta
        self.dMatrizB = []
        self.h = []
        self.dMatrizA = []
        self.A = []
        self.dOrtho = []
        self.dV = []
        self.MatrizDatos()

    def getdMatrizB(self):
        return self.dMatrizB

    def MatrizUnidimensional(self, filas):
        matriz = []
        for i in range(filas):
            matriz.append([])
        return matriz

    def MatrizBidimensional(self, filas, columnas):
        matriz = []
        for i in range(filas):
            matriz.append([])
            for j in range(columnas):
                matriz[i].append([])
        return matriz

    def mCalculaMatrizB(self, orth):
        self.dMatrizB = self.MatrizUnidimensional(self.iGrado + 1)

        for k in range(self.iGrado + 1):
            dSuma = 0.0
            for i in range(len(self.dDatos)):
                dSuma += self.dDatos[i][0] * orth[k][i] * self.dDatos[i][2]
            self.dMatrizB[k] = dSuma

    def h_k(self, orth):
        self.h = self.MatrizUnidimensional(self.iGrado + 1)
        for k in range(self.iGrado + 1):
            dSuma = 0.0
            for i in range(len(self.dDatos)):
                dSuma += self.dDatos[i][0] * (math.pow(orth[k][i], 2))
            self.h[k] = dSuma

    def calcula(self):
        self.dMatrizA = self.MatrizUnidimensional(len(self.h))
        for i in range(len(self.h)):
            self.dMatrizA[i] = self.dMatrizB[i] / self.h[i]

    def operacionMatrizA(self, bks):
        self.A = self.MatrizUnidimensional(len(self.dMatrizA))
        for k in range(len(self.A) - 1):
            suma = 0.0
            for s in range(k + 1, self.iGrado + 1):
                suma += self.dMatrizA[s] * bks[s][k]
            self.A[k] = self.dMatrizA[k] + suma
        self.A[len(self.dMatrizA) - 1] = self.dMatrizA[-1]

    def Orto(self, v):
        rOrtogonal = ort(v)
        rOrtogonal.ejecutar()
        u = rOrtogonal.getMatrizOrtogonal()
        proy = rOrtogonal.getProyecta()
        dOrtho = u
        aux = proy[-1]
        bks = self.MatrizBidimensional(len(proy), (len(aux) + 1))

        for i in range(len(bks)):
            bks[i][i] = 1.0

        for k in range(1, len(proy)):
            a = proy[k]
            for s in range(k):
                suma = 0.0
                for t in range((k - s - 1) + 1):
                    suma += a[k - (t + 1)] * bks[k - (t + 1)][s]
                bks[k][s] = suma
        self.mCalculaMatrizB(dOrtho)
        self.h_k(dOrtho)
        self.calcula()
        self.operacionMatrizA(bks)
        return u

    def getH(self):
        return self.h

    def getA(self):
        return self.A

    def getdMatrizA(self):
        return self.dMatrizA

    def mEvaluRecu(self, datos, dMatrizA):
        dMatrizRec = self.MatrizBidimensional(len(datos), 2)
        for i in range(len(datos)):
            dMatrizRec[i][0] = datos[i][1]
            suma = 0.0
            for j in range(len(dMatrizA)):
                print(f'({datos[i][1]} * {dMatrizA[j]}) + ', end='')
                suma += operaciones.calculo(datos[i][1], self.alpha, self.beta, j) * dMatrizA[j]
            print()
            dMatrizRec[i][1] = suma

        return dMatrizRec

    def mError(self, datos, dMatrizR, m):
        suma = 0.0
        for i in range(len(datos)):
            suma += math.pow(datos[i][2] - dMatrizR[i][1], 2)
        valor = suma / (len(datos) - (m + 1))
        if valor == 0 or valor < 0:
            return 0
        else:
            return math.sqrt(valor)

    def MatrizDatos(self):
        v = self.MatrizBidimensional(self.iGrado + 1, len(self.dDatos))
        print('Datos de la matriz')
        for i in range(self.iGrado + 1):
            for j in range(len(self.dDatos)):
                v[i][j] = operaciones.calculo(self.dDatos[j][1], self.alpha, self.beta, i)
        print(len(v) * len(v[0]))
        self.Orto(v)

        return v
