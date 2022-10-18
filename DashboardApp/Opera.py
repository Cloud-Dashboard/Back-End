def MatrizUnidimensional(filas):
    matriz = []
    for i in range(filas):
        matriz.append([])
    return matriz


def SumVec(v, u):
    result = 0
    lst = MatrizUnidimensional(len(u))
    for i in range(len(u)):
        result = v[i] + u[i]
        lst[i] = result

    return lst


def RestaVec(v, u):
    lst = MatrizUnidimensional(len(u))

    for i in range(len(u)):
        result = v[i] - u[i]
        lst[i] = result

    return lst


def productoPunto(u, v):
    result = 0

    for i in range(len(u)):
        result += u[i] * v[i]

    return result


def productoEscalar(escalar, u):
    lst = MatrizUnidimensional(len(u))

    for i in range(len(u)):
        result = u[i] * escalar
        lst[i] = result

    return lst
