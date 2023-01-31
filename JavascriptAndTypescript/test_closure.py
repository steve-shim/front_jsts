numbers = []

def enter_number(x):
    numbers.append(x)
    print(numbers)

enter_number(3)
enter_number(4)
enter_number(5)

# 위와 같이 전역변수를 사용하지 않고 상태를 저장하는 변수를 활용하는 방법1: 클로저
# Closure: a function in another function

def enter_number_outer():
    numbers = []
    def enter_number_inner(x):
        numbers.append(x)
        print(numbers)

    return enter_number_inner

enter_number = enter_number_outer()
enter_number(1)
enter_number_2 = enter_number_outer()
enter_number_2(10)
enter_number_2(20)
enter_number(2)
enter_number(3)

# 위와 같이 전역변수를 사용하지 않고 상태를 저장하는 변수를 활용하는 방법2: 클래스
# 하지만 아래와 같이 클래스 변수에 mutable type의 변수가 있으면
# 해당 클래스로 생성된 모든 인스턴스들이 클래스 변수을 공유하는 문제가 생긴다
class enter_number_out:
    numbers = []
    def enter_number_in(self, x):
        self.numbers.append(x)
        print(self.numbers)

a = enter_number_out()
a.enter_number_in(39)
b = enter_number_out()
b.enter_number_in(390)
b.enter_number_in(490)
a.enter_number_in(49)
a.enter_number_in(59)

# 인스턴스별로 독립적인 mutable 객체를 갖기 위해서는 
# 클래스 변수가 아닌 인스턴스 변수에 선언해야한다
class enter_number_out:
    def __init__(self):
        self.numbers = []
    def enter_number_in(self, x):
        self.numbers.append(x)
        print(self.numbers)

a = enter_number_out()
a.enter_number_in(39)
b = enter_number_out()
b.enter_number_in(390)
b.enter_number_in(490)
a.enter_number_in(49)
a.enter_number_in(59)