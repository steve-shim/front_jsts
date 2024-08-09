class BookReader:
    country = 'South Korea' # immutable 클래스 변수 선언
    cnt = 0
    def __init__(self, name):
        self.name = name # 인스턴스 변수 name 선언
    def read_book(self):
        print(self.name, 'is reading in', self.country)
    
chris = BookReader('Chris Cho')
anna = BookReader('Anna Cho')
# 클래스 변수에 cnt가 없으면 AttributeError: 'BookReader' object has no attribute 'cnt' 에러
chris.cnt += 1  # chris 객체에 cnt 변수가 없으므로 인스턴스변수 cnt 만들고 1 할당
BookReader.cnt += 5 # 클래스 변수 cnt 에 5 할당
print(chris.cnt)  # 1
print(anna.cnt)   # 5
chris.read_book() # Chris Cho is reading in South Korea
anna.read_book()  # Anna Cho is reading in South Korea
print()

chris.country = 'USA' # chris 객체에 country 변수가 없으므로 인스턴스변수 country 만들고 'USA' 할당
chris.read_book()     # Chris Cho is reading in USA (인스턴스변수 우선 적용)
anna.cnt += 3         # anna 객체에 cnt 변수가 없어서 인스턴스변수 cnt를 만들 때 클래스변수 5에서 3더한 값 8 할당
print(anna.cnt)       # 8
anna.read_book()      # Anna Cho is reading in South Korea
print()

BookReader.country = 'Italy' # 클래스 변수를 'Italy' 로 바꾼다 (이때 immutable한 인스턴스 변수는 바뀌지 않는다)
chris.read_book()            # Chris Cho is reading in USA
anna.read_book()             # Anna Cho is reading in Italy
sean = BookReader('Sean Cho')
sean.read_book()             # Sean Cho is reading in Italy
chris.cnt += 2               # chris 객체가 가지고 있는 cnt 값 1에 2를 더해서 3저장 
print(chris.cnt)             # 3