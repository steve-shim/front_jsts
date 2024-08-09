class MaxHeap:
    def __init__(self):
        self.data = []

    def size(self):
        return len(self.data)

    def insert(self, value):
        self.data.append(value)
        self.heapify(len(self.data) - 1)

    def pop(self):
        ret = self.data[0]
        self.data[0] = self.data[-1]
        self.data.pop()
        self.max_heapify(0)
        return ret

    def peek(self):
        return self.data[0]

    def max_heapify(self, index):
        left = 2 * index + 1
        right = 2 * index + 2
        largest = index

        if left < len(self.data) and self.data[left] > self.data[largest]:
            largest = left
        if right < len(self.data) and self.data[right] > self.data[largest]:
            largest = right
        if largest != index:
            self.data[index], self.data[largest] = self.data[largest], self.data[index]
            self.max_heapify(largest)

    def heapify(self, index):
        parent = (index - 1) // 2
        if parent >= 0:
            if self.data[index] > self.data[parent]:
                self.data[index], self.data[parent] = (
                    self.data[parent],
                    self.data[index],
                )
                self.heapify(parent)


if __name__ == "__main__":
    max_heap = MaxHeap()
    for i in range(5):
        print(f"max_heap.insert({i})")
        max_heap.insert(i)
        print(f"max_heap.peek(): {max_heap.peek()}")

    print("===========================================")
    for _ in range(5):
        print(f"max_heap.size(): {max_heap.size()}")
        print(f"max_heap.pop(): {max_heap.pop()}")