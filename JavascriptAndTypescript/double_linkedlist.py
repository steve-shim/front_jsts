class Node:
    def __init__(self, data, prev_=None, next_=None):
        self.data = data
        self.prev = prev_
        self.next = next_


class DoubleLinkedList:
    def __init__(self):
        self.head = Node(None)
        self.tail = Node(None)
        self._size = 0

        self.head.next = self.tail
        self.tail.prev = self.head

    def size(self):
        return self._size

    def add(self, data):
        last = self.tail.prev
        new_node = Node(data, last, self.tail)
        last.next = new_node
        self.tail.prev = new_node
        self._size += 1

    def insert(self, index, data):
        if index > self._size or index < 0:
            raise RuntimeError("Index out of error")

        prev, current = None, None
        # 인덱스를 찾아가기 위한 변수
        i = 0
        if index < self._size // 2:
            prev = self.head
            current = self.head.next
            while i < index:
                prev = prev.next
                current = current.next
                i += 1
        else:
            current = self.tail
            prev = self.tail.prev
            while i < (self._size - index):
                current = current.prev
                prev = prev.prev
                i += 1

        # 노드를 생성해서 연결을 바꿔주는 부분
        new_node = Node(data, prev, current)
        current.prev = new_node
        prev.next = new_node
        self._size += 1

    def clear(self):
        self._size = 0
        self.head.next = self.tail
        self.head.prev = None
        self.tail.next = None
        self.tail.prev = self.head

    def delete(self, data):
        prev = self.head
        current = prev.next
        while current is not None:
            if current.data == data:
                prev.next = current.next
                current.next.prev = prev
                current.next = None
                current.prev = None
                self._size -= 1
                return True

            prev = prev.next
            current = current.next

        return False

    def delete_by_index(self, index):
        if index >= self._size or index < 0:
            raise RuntimeError("Index out of error")

        prev_, current_, next_ = None, None, None
        i = 0
        if index < self._size // 2:
            prev_ = self.head
            current_ = self.head.next
            while i < index:
                prev_ = prev_.next
                current_ = current_.next
                i += 1
            prev_.next = current_.next
            current_.next.prev = prev_
            current_.next = None
            current_.prev = None
        else:
            current_ = self.tail.prev
            next_ = self.tail
            while i < (self._size - index - 1):
                next_ = next_.prev
                current_ = current_.prev
                i += 1

            next_.prev = current_.prev
            current_.prev.next = next_
            current_.next = None
            current_.prev = None

        self._size -= 1
        return True

    def get(self, index):
        if index >= self._size or index < 0:
            raise RuntimeError("Index out of error")

        i = 0
        current = None
        # index가 head에 더 가까운 경우
        if index < self._size // 2:
            current = self.head.next
            while i < index:
                current = current.next
                i += 1
        # index가 tail에 더 가까운 경우
        else:
            current = self.tail.prev
            while i < (self._size - index - 1):
                current = current.prev
                i += 1

        return current.data

    def index_of(self, data):
        current = self.head.next
        index = 0
        while current != None:
            if current.data != None and current.data == data:
                return index
            current = current.next
            index += 1
        return -1

    def is_empty(self):
        return self.head.next == self.tail

    def contains(self, data):
        current = self.head.next
        while current != None:
            if current.data != None and current.data == data:
                return True
            current = current.next
        return False


if __name__ == "__main__":
    l = DoubleLinkedList()
    for elem in [3, 2, 5, 1, 4]:
        print(f"l.add({elem})")
        l.add(elem)

    print(f"l.size(): {l.size()}")
    print(f"{l.get(0)} {l.get(1)} {l.get(2)} {l.get(3)} {l.get(4)}")
    print("=====================")
    for elem in [3, 2, 5, 1, 4, 100]:
        print(f"l.contains({elem}): {l.contains(elem)}")
        print(f"l.index_of({elem}): {l.index_of(elem)}")

    print("=====================")
    for elem in [4, 5, 100]:
        print(f"l.delete({elem}): {l.delete(elem)}")

    print(f"l.size(): {l.size()}")

    print(f"{l.get(0)} {l.get(1)} {l.get(2)}")
    print(f"l.insert(2, 101)")
    l.insert(2, 101)
    print(f"{l.get(0)} {l.get(1)} {l.get(2)} {l.get(3)}")
    l.delete_by_index(0)
    l.delete_by_index(1)
    print(f"{l.get(0)} {l.get(1)}")
    #l.delete_by_index(2)

    for elem in [3, 2, 5, 1, 4, 100, 101]:
        print(f"l.contains({elem}): {l.contains(elem)}")
        print(f"l.index_of({elem}): {l.index_of(elem)}")

    print(f"l.clear(): {l.clear()}")
    for elem in [3, 2, 5, 1, 4, 100, 101]:
        print(f"l.contains({elem}): {l.contains(elem)}")
        print(f"l.index_of({elem}): {l.index_of(elem)}")