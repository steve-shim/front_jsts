// 삽입 정렬 함수
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        // i -> 현재 가리키는 원소
        console.log("i",i)
        for (let j = i; j > 0; j--) {
        // 인덱스 j부터 1까지 1씩 감소하며 반복
            if (arr[j] < arr[j - 1]) {
                // 한 칸씩 왼쪽으로 이동
                // 스와프(swap)
                let temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                console.log("arr",arr)
            } else {
                // 자기보다 작은 데이터를 만나면 그 위치에서 멈춤
                break;
            }
        }
    }
    return arr
}
console.log(insertionSort([2,4,3,1,9,6,8,7,5]))
    