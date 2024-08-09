def merge_sort(arr):
    if len(arr) <= 1:
        return

    # divide
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    merge_sort(left)
    merge_sort(right)

    # conquer
    i = 0   # left idx
    j = 0   # right idx
    k = 0   # arr idx
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1

    while i < len(left):
        arr[k] = left[i]
        i += 1
        k += 1

    while j < len(right):
        arr[k] = right[j]
        j += 1
        k += 1


if __name__ == "__main__":
    arr = [9,1,6,3,7,2,8,4,5,0]
    merge_sort(arr)
    print(arr)