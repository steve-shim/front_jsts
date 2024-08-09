let user = {
    name: 'John',
    age: 45,
    email: 'john@example.com'
}

console.log(user.name);
console.log(user.hasOwnProperty('email'));


// function Person(name, email, birthday) {
//     this.name = name;
//     this.email = email;
//     this.birthday = new Date(birthday);

// }

// Person.prototype.calculateAge = function () {
//     const diff = new Date() - this.birthday.getTime();
//     const ageDate = new Date(diff);
//     return Math.abs(ageDate.getUTCFullYear() - 1970);
// }

// const john = new Person('john', 'john@example.com', '7-10-91');
// const han = new Person('han', 'han@example.com', '2-11-91');
// console.log(john);
// console.log(han);
// console.log(john.calculateAge())
// console.log(han.calculateAge())

function Person(name, email, birthday) {
    const person = Object.create(personsPrototype);
    person.name = name;
    person.email = email;
    person.birthday = new Date(birthday);
    return person;
}

const personsPrototype = {
    calculateAge() {
        const diff = new Date() - this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}

const john = new Person('john', 'john@example.com', '7-10-91');
const han = new Person('han', 'han@example.com', '2-11-91');
console.log(john);
console.log(han);
console.log(john.calculateAge())
console.log(han.calculateAge())