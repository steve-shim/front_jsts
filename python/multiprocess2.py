from multiprocessing import Process
import time

class Subprocess(Process):
    
    def __init__(self, name):
        super().__init__()
        #Process.__init__(self)
        self.name = name

    # start() 할때 실행되는 코드
    def run(self):
        print(f"[sub] {self.name} start")
        time.sleep(5)
        print(f"[sub] {self.name} end")

if __name__ == "__main__":
    print("[main] start")
    p = Subprocess(name='startcoding')
    p.start()
    # main 프로세스가 sub 프로세스가 종료될때까지 기다림
    p.join()
    print("[main] end")