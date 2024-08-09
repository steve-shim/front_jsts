import copy

# b = [[]] * 10
# a = list(b)
a = [[] for i in range(10)]
#a = [[],[],[],[],[],[]] #* 10
print(a)
a[1].append(1)
print(a)
a[2].append([1,2])
a[3].extend([1,2])
print(a)
print(a[2].remove([1,2]))
print(a[3].remove(2))
print(a)