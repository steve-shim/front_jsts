from collections import OrderedDict


class Node:
    def __init__(self, k, v):
        self.key = k
        self.value = v
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.map = dict()
        self.head = Node(None, None)
        self.tail = Node(None, None)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.head.prev = None
        self.tail.next = None

    def __add_to_first(self, node):
        current_head = self.head.next
        current_head.prev = node
        node.next = current_head
        node.prev = self.head
        self.head.next = node

    def __remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def size(self):
        return len(self.map)

    # 캐시에 데이터 추가
    def put(self, k, v):
        node = self.map.get(k, None)
        if node is None:
            tmp = Node(k, v)
            if len(self.map) == self.capacity:
                self.delete(self.tail.prev.key)
            self.__add_to_first(tmp)
            self.map[k] = tmp
        else:
            node.value = v
            self.__remove_node(node)
            self.__add_to_first(node)

    # 캐시에서 데이터 조회
    def get(self, k):
        node = self.map.get(k, None)
        if node is None:
            return None
        # 참조될때마다 node가 double linked list의 가장 앞에 위치하게 자리바꿈
        self.__remove_node(node)
        self.__add_to_first(node)
        return node.value

    def delete(self, k):
        node = self.map.get(k, None)
        if node is None:
            return False
        # double linked list안의 node 삭제
        self.__remove_node(node)
        # cash에 존재하는 키값 삭제
        del self.map[k]
        return True


if __name__ == "__main__":
    cache = LRUCache(2)
    print("------------------")
    print("cache.put('k1', 1)")
    cache.put("k1", 1)
    print("cache size: {}".format(cache.size()))
    print("cache.get('k1'): {}".format(cache.get("k1")))

    print("------------------")
    print("cache.put('k2', 2)")
    cache.put("k2", 2)
    print("cache size: {}".format(cache.size()))
    print("cache.get('k1'): {}".format(cache.get("k1")))
    print("cache.get('k2'): {}".format(cache.get("k2")))

    print("------------------")
    print("cache.put('k3', 3)")
    cache.put("k3", 3)
    print("cache size: {}".format(cache.size()))
    print("cache.get('k1'): {}".format(cache.get("k1")))
    print("cache.get('k2'): {}".format(cache.get("k2")))
    print("cache.get('k3'): {}".format(cache.get("k3")))

    print("------------------")
    print("cache.put('k3', 4)")
    cache.put("k3", 4)
    print("cache size: {}".format(cache.size()))
    print("cache.get('k2'): {}".format(cache.get("k2")))
    print("cache.get('k3'): {}".format(cache.get("k3")))