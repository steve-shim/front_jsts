class Trace:
    def __init__(self, func):    # 호출할 함수를 인스턴스의 초깃값으로 받음
        self.func = func         # 호출할 함수를 속성 func에 저장
        print("init")

    def __call__(self, b):
        print(self.func.__name__, '함수 시작')    # __name__으로 함수 이름 출력
        self.func()                               # 속성 func에 저장된 함수를 호출
        print("call 인자", b)
        print(self.func.__name__, '함수 끝')
        return 1


@Trace    # @데코레이터
def hello():
    print('hello')


print(hello(332))    # 함수를 그대로 호출


# def hello():
#     print('hello')


# a = Trace(hello)
# a(233)
# Trace(hello)(233)
