from enum import Enum # Enum 모듈 import

class Rainbow(Enum): # Enum 상속 받는 클래스 만들기
    # enum 타입의 상수 인스턴스는 기본적으로 이름(key) 와 값(value)을 속성으로 가짐
    Red = 0 
    Orange = 1
    Yellow = 2
    Green = 3
    Blue = 4
    Navy = 5
    Purple = 6
    
# Enum 호출방법 2가지
# Rainbow['blue']
# Rainbow.Blue

# name, value
print("Rainbow.Blue.name", Rainbow.Blue.name) # 'Blue'
print("Rainbow.Blue.value", Rainbow.Blue.value) # 4



# 순회하면서 모든 상수 확인
for color in Rainbow :
    print("color", color)

class Mood(Enum):
     FUNKY = 1
     HAPPY = 3

     def describe(self):
         # self is the member here
         return self.name, self.value

     def __str__(self):
         return 'my custom str! {0}'.format(self.value)

     @classmethod
     def favorite_mood(cls):
         # cls here is the enumeration
         return cls.HAPPY

print(Mood.FUNKY)
print(Mood.HAPPY)
print(Mood.favorite_mood())
print(Mood.HAPPY.describe())
print(str(Mood.FUNKY))


class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def __str__(self):
        return '{0}: {1}'.format(self.name, self.age)

def main():
    p = Person('James', 23)
    print(p)  # James: 23  --> __str__ 호출

main()


class ShapePoints(Enum):
  X = 1
  Y = 2
  Z = 3

def points_per_shape(shape: str) -> int:
  return ShapePoints[shape].name, ShapePoints[shape].value

print("ShapePoints",[i.name for i in ShapePoints])
print("ShapePoints",[i.value for i in ShapePoints])
# print(points_per_shape('X'))
# print(points_per_shape('Y'))
# print(points_per_shape('Z'))
