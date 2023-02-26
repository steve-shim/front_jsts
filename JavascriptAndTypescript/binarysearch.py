def binary_search(arr, target):
    l = 0
    r = len(arr) - 1

    while l <= r:
        #m = (l + r) // 2
        m = l + ((r - l) // 2)
        print("m",m)
        if arr[m] < target:
            l = m + 1
        elif arr[m] > target:
            r = m - 1
        else:
            return m
    
    return -1

if __name__ == "__main__":
    arr = [1,2,3,4,5,6,7,8]
    print(binary_search(arr, 3))
    print(binary_search(arr, 7))
    print(binary_search(arr, 15))