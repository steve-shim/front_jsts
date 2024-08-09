class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

def printNodes(node:ListNode):
    crnt_node = node
    while crnt_node is not None:
        print(crnt_node.val, end=' ')
        crnt_node = crnt_node.next

class SLinkedList:
    def __init__(self):
        self.head = None
        
    def addAtHead(self, val): #O(1)
        node = ListNode(val)
        node.next = self.head
        self.head = node

    #but when the list
    def addBack(self, val): #O(n)
        node = ListNode(val)
        crnt_node = self.head
        while crnt_node.next:
            crnt_node = crnt_node.next
        crnt_node.next = node

    def findNode(self, val): #O(n)
        crnt_node = self.head
        while crnt_node is not None:
            if crnt_node.val == val:
                return crnt_node
            crnt_node = crnt_node.next
        raise RuntimeError('Node not found')

    def addAfter(self, node, val): #O(1)
        new_node = ListNode(val)
        new_node.next = node.next
        node.next = new_node

    def deleteAfter(self, prev_node): #O(1)
        if prev_node.next is not None:
            prev_node.next = prev_node.next.next


if __name__ == "__main__":

    a = SLinkedList()
    a.addBack(12)
    a.addBack(3)
    a.addBack(4)
    a.addBack(5)
    printNodes(a)