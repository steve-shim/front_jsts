def factorial1(num):
    if num <= 1:
        return num
    return num * factorial1(num - 1)

def factorial2(num):
    if num > 1:
        return num * factorial2(num - 1)
    else:
        return num

print("factorial1(num)",factorial1(5))
print("factorial2(num)",factorial2(5))

def fibo_dp(num):
    cache = [ 0 for index in range(num + 1)]
    cache[0] = 1
    cache[1] = 1
    
    for index in range(2, num + 1):
        cache[index] = cache[index - 1] * cache[index - 2]
    return cache[num]

print("fibo_dp(num)",fibo_dp(5))