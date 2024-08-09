// 버블 정렬 함수
function bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) { // 내림차순 예시
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                }
            }
            console.log("arr",arr)
        }
        return arr
    }
console.log(bubbleSort([9,8,2,4,3]))    