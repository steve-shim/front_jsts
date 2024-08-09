class Stuff(object):

    def __init__(self, x, y, range):
        super(Stuff, self).__init__()
        self.x = x
        self.y = y
        self.range = range

    def __call__(self, x, y):
        self.x = x
        self.y = y
        print(f"__call__ with ({self.x}, {self.y})")

    def __del__(self):
        del self.x
        del self.y
        del self.range

s = Stuff(1, 2, 3)
print("s.x",s.x)

s(7, 8)
s.__call__(10, 20)
print("s.x",s.x)
