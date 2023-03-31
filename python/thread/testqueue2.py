import random, time, threading
from queue import Queue

THREAD_POOL_SIZE = 5

def execute_thread(*args, **kwargs):
    print(f"child thread start: args={args} kwargs={kwargs}")
    sleep_time = random.randint(1, 3)
    print("sleep_time",sleep_time)
    time.sleep(sleep_time)
    print(f"child thread finished")


if __name__ == '__main__':
    work_queue = Queue()
    threads = [
        threading.Thread(target=execute_thread, args=(work_queue, 1) , kwargs={"name": "kim", "age": 10})
        for _ in range(THREAD_POOL_SIZE)
    ]

    for thread in threads:
        thread.start()

    while threads:
        threads.pop().join()
    
    # thread = threading.Thread(target=execute_thread, args=(1,), kwargs={"name": "kim", "age": 10})
    # thread.start()
    # thread.join()
    print("parents thread finished")