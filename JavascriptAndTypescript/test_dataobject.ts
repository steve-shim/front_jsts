// 객체 문법
type Box = {
    width:number;
    height:number;
    borderRadius:number;
    backgroundColor:string;
    borderWidth?: number;
    ['className']?: string;
}

// 틀과 데이터가 묶여있다
// Box 객체가 500개 있다고하면 key값이 변하면 500번 수정해야한다
let box: Box = {
    width:200,
    height:200,
    borderRadius:5,
    backgroundColor:'red',
}

// 함수 이용해서 객체 생성
// 틀과 데이터를 분리하는 방법
// 데이터는 밖에서 공급하고 makeBox는 공급받은 데이터를 활용하여 객체화
function makeBox(
    width:number,
    height:number,
    borderRadius:number,
    backgroundColor:string,
) : Box {
    return {
        width,height,borderRadius,backgroundColor
    };
}

makeBox(100,100, 0, 'blue');

// 클래스 이용하여 객체 생성
class Shape implements Box{
    width:number;
    height:number;
    borderRadius:number;
    backgroundColor:string;

    constructor(
        width:number,
        height:number,
        borderRadius:number,
        backgroundColor:string,
    ) {
        this.width = width;
        this.height = height;
        this.borderRadius = borderRadius;
        this.backgroundColor = backgroundColor;
    }
}

const boxShape = new Shape(10, 10, 0, 'blue');


// 객체 변형
box.borderRadius = 10;
box['className'] = 'box rounded';

const box1 = box;
// 원본 객체와의 연결을 완전히 끊는 방법
// 1. box와 box2는 완전 별개의 객체로 생성할 수 있다
const box2 = Object.assign({}, box);
// 2. box와 box4는 완전 별개의 객체로 생성할 수 있다
const box4 = {...box, borderRadius: 10};
// 3. box와 box3는 완전 별개의 객체로 생성할 수 있다
const box3 = JSON.parse(JSON.stringify(box));