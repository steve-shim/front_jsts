class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val


class HashTable:
    def __init__(self, bucket_size=10):
        self.buckets = [[]] * bucket_size
        self.bucket_size = bucket_size
        self._size = 0

    def put(self, key, val):
        idx = hash(key) % self.bucket_size
        for elem in self.buckets[idx]:
            if elem.key == key:
                elem.val = val
                return
        node = Node(key, val)
        self.buckets[idx].append(node)
        self._size += 1

    def get(self, key):
        idx = hash(key) % self.bucket_size
        for elem in self.buckets[idx]:
            if elem.key == key:
                return elem.val
        return None

    def contains(self, key):
        idx = hash(key) % self.bucket_size
        for elem in self.buckets[idx]:
            if elem.key == key:
                return True
        return False

    def delete(self, key):
        idx = hash(key) % self.bucket_size
        for idx, elem in enumerate(self.buckets[idx]):
            if elem.key == key:
                self.buckets[idx].remove(elem)
                self._size -= 1

    def size(self):
        return self._size


if __name__ == "__main__":
    table = HashTable()
    print('table.put("s1", "v1")')
    table.put("s1", "v1")
    print('table.put("s2", "v2")')
    table.put("s2", "v2")
    print('table.put("s3", "v3")')
    table.put("s3", "v3")
    print(f"table.size(): {table.size()}")
    print(f"table.get('s1'): {table.get('s1')}")
  