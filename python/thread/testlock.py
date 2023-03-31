from threading import Thread, Lock

thread_visits = 0

def visit_counter():
    global thread_visits
    for i in range(100_000):
        lock.acquire()
        thread_visits += 1
        lock.release()

if __name__ == "__main__":
    lock = Lock()
    thread_count = 100
    threads = [Thread(target=visit_counter) for _ in range(thread_count)]
    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()

    print(f"thread_count= {thread_count}, thread_visits= {thread_visits}")
