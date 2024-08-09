def insertion_sort(arr):
    arr = arr[:]
    for i in range(1, len(arr)):
        # key: 삽입위치를 찾아줄 데이터
        key = arr[i]
        # 0부터 j까지를 정렬된 서브리스트로 볼꺼다
        j = i - 1
        while j >= 0 and arr[j] > key:
            print("j",j,"key",key)
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        print("arr",arr)
    return arr

if __name__ == "__main__":
    arr = [5,3,1,2,4,6]
    #arr = [9,1,6,3,7,2,8,4,5,0]
    print("리턴 arr", insertion_sort(arr))
    print("원본 arr", arr)