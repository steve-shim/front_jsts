# 1. 내부 함수
# 함수 안에 또다른 함수를 정의할 수 있다.

def outer(name):
    def inner():
        print(name, "님 안녕하세요!")
    return inner

func = outer("startcoding")
func()

# 2. 클로저
# 함수가 종료되어도 자원을 사용할 수 있는 함수

# ** 클로저가 될 조건
# 1) 내부 함수 여야 한다.
# 2) 외부 함수의 변수를 참조해야 한다.
# 3) 외부 함수가 내부 함수를 반환해야 한다.

def greeting(name, age, gender):
    def inner():
        print(name, "님 안녕하세요!")
        print("나이: ", age)
        print("성별: ", gender)
    return inner

closure = greeting('나미', 27, 'female')
closure() 
# 외부함수 greeting이 종료되었음에도 내부함수 inner는 클로저 공간에 있는 외부함수 변수를 쓸 수 있다
# 클로저를 안쓰고 전역변수로도 대체 가능하지만 권장x, 대신 클래스로 구현하는거는 권장o

# print(closure.__closure__[0].cell_contents)

for i in func.__closure__:
    print(i.cell_contents)

for i in closure.__closure__:
    print(i.cell_contents)

# 전역변수를 사용해서 대체가 가능하다.
# 전역변수 사용을 최소화 하는 것이 좋다 (네이밍문제, 스코프문제)