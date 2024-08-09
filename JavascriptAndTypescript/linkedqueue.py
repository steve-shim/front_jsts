
class Node:
    def __init__(self, data, next_=None):
        self.data = data
        self.next = next_

class LinkedQueue:

    def __init__(self):
        self._size = 0
        self.head = Node(None)
        self.tail = self.head

    def offer(self, data):
        node = Node(data)
        self.tail.next = node
        self.tail = self.tail.next
        self._size += 1

    def poll(self):
        if self._size == 0:
            raise RuntimeError("Empty")

        ret = self.head.next
        self.head.next = ret.next
        ret.next = None
        self._size -= 1
        if self.head.next is None:
            self.tail = self.head
        return ret.data

    def peek(self):
        if self._size == 0:
            raise RuntimeError("Empty")
        return self.head.next.data

    def size(self):
        return self._size

    def clear(self):
        self.head.next = None
        self.tail = self.head
        self._size = 0


if __name__ == '__main__':
    q = LinkedQueue()
    for elem in [5, 3, 6, 8]:
        print(f"q.offer({elem})")
        q.offer(elem)

    print(f"q.size(): {q.size()}")
    while q.size() > 0:
        print(f"q.peek(): {q.peek()}")
        print(f"q.pop(): {q.poll()}")

    print(f"q.size(): {q.size()}")