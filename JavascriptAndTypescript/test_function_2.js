const sumV2 = (a, b, ...args) => {
    let s = 0;
    for(let i =0; i< args.length; i++){
        s = s + args[i];
    }
    return s;
}


const ten = x => 100 + x; 
const ten2 = (x,y) => 100 + x + y;
const ten3 = (x,y) => {
    return 100 + x + y;
}
console.log("ten(10)",ten(10))
console.log("ten2(10,20)",ten2(10,20))
console.log("ten3(10,20)",ten3(10,20))

function* gen(){
    yield 10;
    yield 20;
    return 30;
}

// g: 제너레이터를 컨트롤할 수 있는 객체 생성
const g = gen();

console.log(g)
console.log(g.next());
console.log(g.next());
console.log(g.next());

// 비동기 함수
async function myTask() {
    
}