import threading
import time

# 주식 자동매매
# 매수, 매도

# 매수 스레드
def buyer():
    for i in range(2):
        print("[매수] 데이터 요청 중...")
        time.sleep(1)
        print("[매수] 데이터 분석 중...")
        time.sleep(1)
        print("[매수] 오!! 지금이 매수 타이밍인가!!...")
        time.sleep(1)
        print("[매수] 풀매수 가즈아!!...")
        time.sleep(1)

# 매도 스레드
def saler():
    for i in range(2): 
        print("[매도] 데이터 요청 중...")
        time.sleep(1)
        print("[매도] 데이터 분석 중...")
        time.sleep(1)
        print("[매도] 손절할까? 익절할까?...")
        time.sleep(1)
        print("[매도] 눈물을 머금고 손절합니다...")
        time.sleep(1)

# 메인 스레드
print("[메인] start")
buyer = threading.Thread(target=buyer)
saler = threading.Thread(target=saler)
# saler.daemon = True
# buyer.daemon = True
buyer.start()
saler.start()

# join -> 메인 스레드가 종료되는 시점을 서브 스레드가 종료 되고나서로 할 수 있다
# join을 안쓰면 main 스레드가 sub 스레드를 기다리지 않고 바로 종료된다
# 만약에 daemon 속성을 True로 주면 main 스레드가 죽을 떄 sub 스레드들도 죽기 때문에 프로그램이 다죽는다.
buyer.join() # 매수 스레드가 종료될때까지 메인 스레드가 기다림 
saler.join() # 매도 스레드가 종료될때까지 메인 스레드가 기다림 
print("[메인] 장이 종료되었습니다.") 

# 결론
# .join()을 하면 서브 스레드가 종료되면 메인스레드 종료
# .join()이 없으면 서브 스레드가 종료되기 전에 메인스레드 종료
# .daemon = True 옵션을 주면 메인 스레드가 죽으면 서브 스레드 다 죽음