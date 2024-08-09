const person = {
    name: 'Kim min tae',
    age:40,
    getAge() {
        return this?.age ?? -1;
    }
};

console.log(person.age);
// 실행하는 순간 소유자가 정해져서 함수 내부 this는 소유자를 가리키게 된다
console.log(person.getAge());

const age = person.getAge;

// 실행하는 순간에 소유자가 누군지 모르게 된다
console.log(age()); 

console.log(age.call(person));
console.log(age.apply(person));


class Person{
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
        this.getAge = this.getAge.bind(this);
    }

    getAge(){
        return this.age;
    }

    getName = () => this.name;
}

const p1 = new Person('Kim mintae', 30);

console.log(p1.getAge());

const myAge = p1.getAge;

// myAge.call(p1);
console.log("myAge()",myAge());

p1.getName();

const x = p1.getName;
console.log(x());

