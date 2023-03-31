from queue import Queue
import threading
import time

def push(q):
    print('Thread1 Start')
    time.sleep(1)
    q.put('Zero')
    q.put('One')
    q.put('Two')
    q.put('Three')
    q.put('Four')

def pop(q):
    print('thread2 Start')
    time.sleep(1)
    while not q.empty():
        test = q.get() #큐의 내용을 얻어옮
        if test:
            time.sleep(1)
            print(test)
        q.task_done()

if __name__ == "__main__":
    queue = Queue() #큐 생성
    thread1 = threading.Thread(target=push, args=(queue, )) #쓰레드 생성
    thread2 = threading.Thread(target=pop, args=(queue, )) #쓰레드 생성
    print("[1]main")
    thread1.start()
    thread2.start()
    print("[2-1]main")
    queue.join()
    print("[2]main")
    thread1.join()
    thread2.join()
    print("[3]main")