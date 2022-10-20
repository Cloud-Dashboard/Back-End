from DashboardApp.Matrices import Matrices

salidas = []

def ejecucionX(datos, grado, alpha, beta):
    cMatriz = Matrices(datos, grado, alpha, beta)

    # dMatrizB = cMatriz.getdMatrizB()
    # h_K = cMatriz.getH()
    # dMatrizA = cMatriz.getdMatrizA()
    A = cMatriz.getA()
    dMatrizR = cMatriz.mEvaluRecu(datos, A)

    dErr = cMatriz.mError(datos, dMatrizR, grado)
    
    # print(f'\nCoeficientes: {len(A) - 1}')
    for i in range(len(A)):
        #print(A[i])
        Ai=A[i]

    # print('\nSalida:')
    for j in range(len(dMatrizR)):
        for k in range(len(dMatrizR[0])):
            # print(f'{dMatrizR[j][k]}', end=' ')
            dMR=dMatrizR[j][k]


            if k == 1:
                salidas.append(dMatrizR[j][1])
        # print()
    # print(dErr)
    return dMatrizR



def getSalidas():
    return salidas
