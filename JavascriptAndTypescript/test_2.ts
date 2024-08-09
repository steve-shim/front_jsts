function addAge(age: number): number{
    return age + 1;
}

let age: number = addAge(30);
// let age: number = addAge('30'); 런타임이전에 에러를 발생시켜준다

console.log(age);