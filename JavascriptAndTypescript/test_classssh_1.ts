interface Container {
    tagName: string;
    className: string;
    children?: string[];
    getTagName: () => string;
    getClassName: () => string;
}

//static -> instance끼리 관계가 없이 그냥 Shape class만 독립적으로 사용하는 경우
abstract class Shape {
    public static MIN_BORDER_WIDTH = 0;
    public static MAX_BORDER_WIDTH = 30;

    // 외부에서 변경불가
    public readonly name: string = 'Default Shape';
    protected _borderWidth: number;
    private action!: string;

    constructor(borderWidth: number = 90){
        this._borderWidth = borderWidth;
    }

    // 정의만 되어있음(내용은 없음)
    // 이 클래스를 상속받은 자식 클래스는 반드시 해당 메소드를 실체화된 코드를 구현해야한다
    abstract area: () => number;

    set borderWidth(width: number){
        if(width >= Shape.MIN_BORDER_WIDTH && width <= Shape.MAX_BORDER_WIDTH){
            this._borderWidth = width;
        } else {
            throw new Error('borderWidth 허용 범위를 벗어난 동작을 시도했습니다.');
        }
    }
    
    get borderWidth(): number{
        return this._borderWidth;
    }
}

class Circle extends Shape{
    private _radius: number
    public name: string = 'Circle';

    constructor(radius: number){
        super();
        this._radius = radius;
    }

    get radius(){
        // _borderWidth 속성이 부모에서 protected로 정의가 되어있기 때문어
        // 외부에서는 접근이 불가능하지만 자식클래스에서는 접근이 허용된다
        console.log("this._borderWidth",this._borderWidth)
        return this._radius;
    }
    
    area = () => this._radius * this._radius * Math.PI;
}

class Rect extends Shape {
    private _width: number;
    private _height: number;

    constructor(width: number, height:number){
        super();
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    area = () => this._width * this._height;
}

const circle = new Circle(50);
const rect = new Rect(150, 200);

console.log(circle.name);
console.log(circle.radius);

console.log(rect.borderWidth);
console.log(rect.name);
console.log(rect.width, rect.height);
console.log(rect.area());

try{
    rect.borderWidth = 10;
} catch(e){
    console.error(e);
}
console.log(rect.borderWidth);

class MyContainer implements Container{
    tagName: string;
    className: string;

    constructor(tagName:string, className:string){
        this.tagName = tagName;
        this.className = className;
    }

    getTagName = () => this.tagName;
    getClassName = () => this.className;
}

console.log('done');