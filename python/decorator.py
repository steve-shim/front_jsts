def trace(func):                             # 호출할 함수를 매개변수로 받음
    def wrapper():
        print(func.__name__, '함수 시작')    # __name__으로 함수 이름 출력
        func()                               # 매개변수로 받은 함수를 호출
        print(func.__name__, '함수 끝')
    return wrapper                           # wrapper 함수 반환
 
@trace    # @데코레이터
def hello():
    print('hello')
 
@trace    # @데코레이터
def world():
    print('world')
 
# hello()    # 함수를 그대로 호출
# world()    # 함수를 그대로 호출


# 데코레이터
# 함수의 앞, 뒤로 부가적인 기능을 넣어주고 싶을 때 사용
# 로깅, 권한확인

# 데코레이터 생성하기
def logger(func):
    def wrapper(arg):
        print("함수 시작 Start")
        func(arg) # 함수 실행
        print("함수 끝 End")
    return wrapper

@logger
def print_hello(name='gg'):
    print("hello", name)

@logger
def print_bye(name='zz'):
    print("bye", name)

print_hello('startcoding')
print_bye('fastcampus')

print(isinstance(1, object))
print(isinstance('a', object))
print(isinstance(logger, object))
print(getattr(logger, '__call__'))


def decorator_name(function):
    def decorator_func():
        print("함수 시작 Start")
        function()
        print("함수 끝 End")
    return decorator_func

@decorator_name
def decorated_func():
    print("Hello!")

decorated_func()


# class deco_cls(object):
#     def __init__(self, value):
#         self.val = value
    
#     def __call__(self, func):
#         print(self.val)

#         def decorator():
#             func()
#         return decorator

# @deco_cls(10)
# def decorated_func():
#     print("Hello!")

# decorated_func()


class deco_cls(object):
    def __call__(self, *args):
        print("args",args)
        def decorator():
            print("[Start]")
            args[0]()
            print("[End]")
        return decorator

deco = deco_cls()

@deco
def decorated_func():
    print("Hello!")

decorated_func()

