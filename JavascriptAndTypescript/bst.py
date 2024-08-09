class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class BinarySearchTree:
    def __init__(self):
        self.root = None
        self._size = 0

    def insert_node(self, node, val):
        if node is None:
            return Node(val)
        if val < node.val:
            node.left = self.insert_node(node.left, val)
        elif val > node.val:
            node.right = self.insert_node(node.right, val)
        return node

    def size(self):
        return self._size

    def insert(self, val):
        self.root = self.insert_node(self.root, val)
        self._size += 1

    def contains(self, val):
        return self.contains_node(self.root, val)

    def contains_node(self, node, val):
        if node is None:
            return False
        if val == node.val:
            return True
        if val < node.val:
            return self.contains_node(node.left, val)
        return self.contains_node(node.right, val)

    def delete(self, val):
        return self.delete_node(self.root, val)

    def delete_node(self, node, val):
        if node is None:
            return None

        if val < node.val:
            node.left = self.delete_node(node.left, val)
        elif val > node.val:
            node.right = self.delete_node(node.right, val)
        else:
            self._size -= 1
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            node.val = self.min_mode(node.right)
            node.right = self.delete_node(node.right, node.val)
        return node

    def min_node(node):
        min_val = node.val
        while node.left is not None:
            min_val = node.left.val
            node = node.left
        return min_val

    def preorder(self):
        ret = []

        def visit(root):
            nonlocal ret
            if root is None:
                return ret
            ret.append(root.val)
            visit(root.left)
            visit(root.right)

        visit(self.root)
        return ret

    def inorder(self):
        ret = []

        def visit(root):
            nonlocal ret
            if root is None:
                return ret
            visit(root.left)
            ret.append(root.val)
            visit(root.right)

        visit(self.root)
        return ret

    def postorder(self):
        ret = []

        def visit(root):
            nonlocal ret
            if root is None:
                return ret
            visit(root.left)
            visit(root.right)
            ret.append(root.val)

        visit(self.root)
        return ret


if __name__ == "__main__":
    btree = BinarySearchTree()
    for i in [5,3,7,1,4,6,9,2,8]:
        print(f"btree.insert({i})")
        btree.insert(i)
        print(f"btree.size(): {btree.size()}")

    print("==================================")
    for i in [1,2,3,4,5,6,7,8,9,10]:
        print(f"btree.contains({i}): {btree.contains(i)}")

    print("===================================")
    print(f"btree.preorder(): {btree.preorder()}")
    print(f"btree.inorder(): {btree.inorder()}")
    print(f"btree.postorder(): {btree.postorder()}")
    print("=====================================")

    print("btree.delete(2)")
    btree.delete(2)
    print("btree.delete(8)")
    btree.delete(8)
    print(f"btree.size(): {btree.size()}")

    print("==================================")
    for i in [3, 1, 2, 3, 8, 7]:
        print(f"btree.contains({i}): {btree.contains(i)}")

    print("===================================")
    print(f"btree.preorder(): {btree.preorder()}")
    print(f"btree.inorder(): {btree.inorder()}")
    print(f"btree.postorder(): {btree.postorder()}")
    print("=====================================")