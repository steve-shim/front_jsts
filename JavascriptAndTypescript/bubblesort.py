def bubble_sort(arr):
    # 전체리스트 순회
    for i in range(len(arr) - 1):
        # 정렬된 리스트 제외하고 순회
        for j in range(len(arr) - i - 1):
            print("i",i,"j",j)
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            print("arr",arr)

if __name__ == "__main__":
    arr = [9,1,6,3,7]
    bubble_sort(arr)

    print(arr)