def add(a,b): return a+b
def sub(a,b): return a-b

# decorator: 함수(add)를 함수(calculation)의 인자로 쓴다
def calculation(func, a, b):
    return func(a, b)

print(calculation(add, 41, 3))
print(calculation(sub, 41, 3))

calc_dict = {
    "덧셈": add,
    "뺄셈": sub
}

print(calc_dict["덧셈"](10,2))
print(add(10,2))

def deco(f):
    print("deco!")
    return f

@deco
def double(num):
    return 2*num

print(double(41))

print("------------")

def deco(f):
    print("deco!")
    return f

def double(num):
    return 2*num

double = deco(double)
print(double(41))
