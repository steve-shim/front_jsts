// 선택 정렬 함수
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i; // 매단계마다 가장 작은 원소의 인덱스
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        // 스와프(swap)
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        console.log("arr",arr)
    }
    return arr
}
console.log(selectionSort([2,4,1,3,8,7]))