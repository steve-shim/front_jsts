const obj = {
    name : 'Min Tae',
    age: 40,
    getFamilyName: function () {
        return 'Kim';
    },
    getLastName: () => 'Kim',
    getBloodType(){
        return 'B';
    }
}

console.log(obj.name);
console.log(obj.age);
console.log(obj.getFamilyName());
console.log(obj.getBloodType());

// 속성에 이상한 값이 들어가는걸 방지하기 위해서는 
// getter와 setter를 써야한다
obj.age = 200;
console.log(obj.age);
obj.age = -500;
console.log(obj.age);