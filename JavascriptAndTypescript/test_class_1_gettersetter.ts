
class Person {
    _bloodType: string;

    constructor(bloodType: string) {
        this._bloodType = bloodType;
    }
    // setter
    set bloodType(btype: string){
        if(btype === 'A' || btype === 'B' || btype === 'O' || btype === 'AB'){
            this._bloodType = btype;
        }
    }
    // getter
    get bloodType(){
        return  `${this._bloodType} 형`
    }
}

const p1 = new Person('B');
const p2 = new Person('A');

console.log(p1.bloodType);
console.log(p2.bloodType);

p1.bloodType = 'C';
console.log(p1.bloodType);