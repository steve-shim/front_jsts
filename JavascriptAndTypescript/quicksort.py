def quick_sort(arr):
    __sort(arr, 0, len(arr) - 1)

def __sort(arr, low, high):
    if low >= high:
        return
    
    pivot = (low + high) // 2
    pivot_val = arr[pivot]

    left, right = low, high
    while left <= right:
        while arr[left] < pivot_val:
            left += 1

        while arr[right] > pivot_val:
            right -= 1

        if left <= right:
            arr[right], arr[left] = arr[left], arr[right]
            left += 1
            right -= 1

    __sort(arr, low, right)
    __sort(arr, left, high)


if __name__ == "__main__":
    arr = [9,1,6,3,7,2,8,4,5,0]
    quick_sort(arr)
    print(arr)
