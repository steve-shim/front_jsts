"""
"멀티스레드 애플리케이션 예시"절 예시
양방향 큐를 스레드간 통신 방법으로
아용하는 방법으로 소개한다.
"""
import time, random
from queue import Queue, Empty
from threading import Thread

import requests, os


SYMBOLS = ("USD", "EUR", "PLN", "NOK", "CZK")
BASES = ("USD", "EUR", "PLN", "NOK", "CZK")

THREAD_POOL_SIZE = 5


def fetch_rates(base):
    response = requests.get(f"https://api.vatcomply.com/rates?base={base}")

    response.raise_for_status()
    rates = response.json()["rates"]
    # 노트: 동일 화폐는 1:1로 환전한다
    rates[base] = 1.0
    print("base",base)
    return base, rates


def present_result(base, rates):
    rates_line = ", ".join([f"{rates[symbol]:7.03} {symbol}" for symbol in SYMBOLS])
    print(f"1 {base} = {rates_line}")


def worker(work_queue, results_queue):
    while not work_queue.empty():
        try:
            item = work_queue.get_nowait()
        except Empty:
            break
        else:
            print("item",item,"pid",os.getpid())
            results_queue.put(fetch_rates(item))
            print("results_queue",results_queue,"pid",os.getpid())
            work_queue.task_done()
            sleep_time = random.randint(1, 5)
            print("sleep_time",sleep_time)
            time.sleep(sleep_time)


def main():
    work_queue = Queue()
    results_queue = Queue()

    for base in BASES:
        work_queue.put(base)

    threads = [
        Thread(target=worker, args=(work_queue, results_queue))
        for _ in range(THREAD_POOL_SIZE)
    ]

    for thread in threads:
        thread.start()
    print("[1]main")
    work_queue.join()
    print("[2]main") # work_queue.task_done() 가 전부 다 수행되면 main 실행
    while threads:
        threads.pop().join()
    print("[3]main") # thread의 가장 긴 sleep_time까지 기다려 주고 main 실행
    while not results_queue.empty():
        present_result(*results_queue.get())


if __name__ == "__main__":
    started = time.time()
    main()
    elapsed = time.time() - started

    print()
    print("time elapsed: {:.2f}s".format(elapsed))
