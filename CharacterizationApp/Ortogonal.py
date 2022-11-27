from CharacterizationApp import Opera

# clase ortogonal para la caraterizacion
class Ortogonal:

    def __init__(self, vector):
        self.vector = self.MatrizBidimensional(len(vector), len(vector[0]))
        self.vectorOrto = self.MatrizBidimensional(len(vector), len(vector[0]))
        self.num = 0
        self.den = 0
        self.proyecta = []
        self.aux = []
        self.aux.append(0.0)
        self.proyecta.append(self.aux)

        for i in range(len(self.vector)):
            for j in range(len(self.vector[0])):
                self.vector[i][j] = vector[i][j]
                self.vectorOrto[i][j] = vector[i][j]

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

    def getMatrizOrtogonal(self):
        return self.vectorOrto

    def proyeccion(self, u, v, stop):
        objAux = self.MatrizUnidimensional(len(v))
        for i in range(len(objAux)):
            objAux[i] = 0
        aux = []
        for i in range(stop):
            num = Opera.productoPunto(u[i], v)
            den = Opera.productoPunto(u[i], u[i])
            num /= den
            aux.append(-1.0 * num)
            Aux = Opera.productoEscalar(num, u[i])
            objAux = Opera.SumVec(Aux, objAux)
        self.proyecta.append(aux)

        return objAux

    def ejecutar(self):
        for i in range(1, len(self.vector)):
            proyAux = self.proyeccion(self.vectorOrto, self.vector[i], i)
            proyAux2 = Opera.RestaVec(self.vector[i], proyAux)
            self.vectorOrto[i] = proyAux2

    def getProyecta(self):
        return self.proyecta
