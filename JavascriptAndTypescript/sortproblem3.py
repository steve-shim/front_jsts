import sys

class Elem:
    def __init__(self, name, korean, english, math):
        self.name = name
        self.korean = korean
        self.english = english
        self.math = math

n = int(sys.stdin.readline())
a = []

for i in range(n):
    inp = sys.stdin.readline().split()
    inp[1:] = map(int, inp[1:])
    a.append(Elem(*inp))

a.sort(key = lambda x: (-x.korean, x.english, -x.math, x.name))

names = [elem.name for elem in a]
for name in names:
    print(name)

'''
한국어점수 기준 내림차순, 영어점수 오름차순, 수학점수 내림차순 기준 정렬
2
ssh 10 20 30
ssm 20 30 40
'''