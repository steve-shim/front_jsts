import os
from multiprocessing import Process
from multiprocessing import Pool

def f(x):
    print(x*x)
    return x*x

print("__name__",__name__)

if __name__ == '__main__':
    p = Pool(4)
    result= p.map(f,[1,2,3,4])
    p.close()
    print("result",result)