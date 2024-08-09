from threading import Thread
import time

def work(work_id, start, end, result):
    total = 0
    for i in range(start, end):
        total += i
        print("work_id",work_id, "i",i)
    result.append(total)

print(__name__)
if __name__ == "__main__":
    start = time.time()
    result = []
    th1 = Thread(target=work, args=(1, 0, 11, result))
    th2 = Thread(target=work, args=(2, 11, 21, result))
    th1.start()
    th2.start()
    th1.join() # join () 메소드는 파이썬에게 프로세스가 종료 될 때까지 대기하도록 지시합니다.
    th2.join()
    print("result", result)
    print(time.time() - start)