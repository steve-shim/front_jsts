# def trace(func):
#     def wrapper():
#         print(func.__name__, '함수 시작')
#         func()
#         print(func.__name__, '함수 끝')
#     print("trace 생성", func.__name__)
#     return wrapper


def trace(func):
    def wrapper():
        print(func.__name__, '함수 시작')
        func()
        print(func.__name__, '함수 끝')
    print("trace 생성", func.__name__)
    return wrapper


def hello():
    print('안녕')


trace_hello = trace(hello)
trace_hello()


# @trace
# def hello():
#     print('안녕')


# hello()
