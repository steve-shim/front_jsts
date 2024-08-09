function addAge(age){
    return age + 1;
}

function addAgewithType(age){
    // 방어코드
    if(typeof age === 'number'){
        return age + 1;
    } else {
        console.log("고민이 필요하다")
    }
}

let age = addAge(30);
// let age = addAge('30'); 문자열로 변경한다 -> return 값이 301 로 나온다
console.log(age);

let agewithType = addAgewithType('30');
console.log(agewithType)