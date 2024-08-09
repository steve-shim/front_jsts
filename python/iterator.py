# 1. 이터러블 객체 (iterable object)
# 문자열, 리스트, 튜플, 딕녀서리, range 객체

# for i in "123":
#     print(i)

# for i in [10, 20, 30]:
#     print(i)

# 리스트가 가지고있는 속성과 메서드 확인 가능
print(dir([10, 20, 30]))
iter_obj = [10, 20, 30].__iter__()

# iterator 객체가 가지고있는 속성과 메서드 확인 가능
print(dir(iter_obj))

print(iter_obj.__next__())
print(iter_obj.__next__())
print(iter_obj.__next__())
# print(iter_obj.__next__())