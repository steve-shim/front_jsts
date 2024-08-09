let age = 10;
// 상수는 대문자로 작성 -> 고칠 수 없구나.!
const AGE = 10;

// 단어간의 구별
// setAge (카멜 케이스) 
// set_Age (스네이크 케이스)
function setAge(){

}

let myData = 'DataData';
// 식별자 명명규칙
// 식별자는 숫자 시작x, 공백포함 불가
const o = {
    aged : 10,
    ['myName']: '심',
    ['123my Name']: '김',
    ['zz']: myData,
    myData
}

console.log("o",o)
console.log(o.aged)
console.log(o['aged'])
// 개체의 속성명에 브래킷을 감싸고 문자열(데이터)을 주면
// 데이터가 코드화(식별자화)가 될 수 있다 -> 식별자 명명규칙을 따르지 않아도 된다
console.log(o.myName)
console.log(o['myName'])
console.log(o['123my Name'])

const Color = {
    Red: 1,
    Blue: 2,
    Green: 3,
};

console.log("Color.Red",Color.Red)

