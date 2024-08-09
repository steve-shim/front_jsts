from queue import Queue
import queue

# if __name__ == '__main__':
#     Q=Queue()
#     Q.put(5)
#     print(Q.get())


Q=queue.Queue()
Q.put(5)
Q.put(555)
Q.put(55)
while not Q.empty():
    print("Q.qsize()",Q.qsize())
    try:
        item=Q.get() # 아무 것도 없는데 get을 하면 원래 block! 인데, nowait()이라 바로 익셉션
    except queue.Empty:
        print("Queue is empty")
    else:
        print(item)
        Q.task_done()