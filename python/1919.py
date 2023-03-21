list = [0 for i in range(26)]
print("list",list)
res = 0
# ord('a'): 97 // ord('z'): 122
for ch in input():
    list[ord(ch) - ord('a')] += 1
    print("list",list)
for ch in input():
    list[ord(ch) - ord('a')] -= 1
    print("list",list)
print(sum(map(abs, list)))

# a = [1.2, 2.5, 3.7, 4.6]
# a = list(map(int, a))
# print("a",a) # [1, 2, 3, 4]