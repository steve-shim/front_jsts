from multiprocessing import Process, Lock

def f(l, i):
    #l.acquire()
    try:
        print('hello world', i)
    finally:
        #l.release()
        pass

if __name__ == '__main__':
    lock = Lock()

    for num in range(10):
        Process(target=f, args=(lock, num)).start()