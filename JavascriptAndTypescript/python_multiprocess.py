import os, time
from multiprocessing import Process
from multiprocessing import Pool

def f(x):
    print("x", x)
    #return x*x

print(__name__)

if __name__ == '__main__':
    start = time.time()
    p = Pool(5)
    result= p.map(f, [[1,3,5,7],[2,4,6,8]])
    p.close()
    print(result)
    print(time.time() - start)
    # with Pool(5) as p:
    #     print(p.map(f, [1, 2, 3]))

    # numbers = [1,2,3,4]
    # proc1   = Process(target=f, args=(numbers[0],))
    # proc1.start()
    # proc2   = Process(target=f, args=(numbers[1],))
    # proc2.start()
    # proc3   = Process(target=f, args=(numbers[2],))
    # proc3.start()
    # proc4   = Process(target=f, args=(numbers[3],))
    # proc4.start()
    # proc1.join()
    # proc2.join()
    # proc3.join()
    # proc4.join()
