import math


def Math(alpha, k):
    sqrt = (puchhamer((-1.0 * alpha), k) * math.pow(-1.0, k)) / puchhamer(1.0, k)
    return sqrt


def puchhamer(alpha, k):
    conb = 1.0
    if k == 0:
        conb = 1.0
    else:
        for i in range(1, k + 1):
            conb = conb * ((alpha + i) - 1)
    return conb
