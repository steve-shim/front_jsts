function increment(){
    let saveNumber = 1;
    return function() {
        return saveNumber++;
    }
}

// 반환된 함수를 값에 저장
const inc = increment();

console.log(inc()); // 1
console.log("inc.saveNumber",inc.saveNumber) // undefined
console.log(inc()); // 2
console.log(inc()); // 3

inc.saveNumber = 200;
console.log("inc.saveNumber",inc.saveNumber) // 200
console.log(inc()); // 4
console.log("inc.saveNumber",inc.saveNumber) // 200
console.log(inc()); // 5
console.log("inc.saveNumber",inc.saveNumber) // 200
