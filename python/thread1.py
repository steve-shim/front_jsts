import threading

# 스레드에서 실행할 함수
def work():
    print("[sub] start")
    keyword = input("[sub] 검색어를 입력하세요 >>>")
    print(f"[sub] {keyword}로 검색을 시작합니다...")
    print("[sub] end")

# 메인스레드 실행되는 부분
print("[main] start")

worker = threading.Thread(target=work)
# daemon 속성을 True로 주면 main thread가 종료될때 sub thread들도 전부 종료된다
worker.daemon = False
worker.start()

print("[main] 메인 스레드는 자기할일을 합니다..")
print("[main] end")