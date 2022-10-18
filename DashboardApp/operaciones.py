import math
from DashboardApp import calculos


def calculo(x, alpha, beta, k):
    sum = 0.0
    if x == -1.0:
        sum = math.pow(-1.0, k) * calculos.Math((k + beta), k)
    if x == 1.0:
        sum = calculos.Math((k + alpha), k)
    else:
        if k == 0:
            sum += (calculos.Math((k + alpha), k) * calculos.Math((k + beta), k - k)) * (math.pow(x - 1, k - k) * math.pow(x + 1, k))
        for i in range(k + 1):
            sum += (calculos.Math((k + alpha), i) * calculos.Math((k + beta), k - i)) * (math.pow(x - 1, k - i) * math.pow(x + 1, i))
        sum *= math.pow(2, -k)
    return sum
