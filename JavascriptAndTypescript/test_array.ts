type Book = {
    title: string;
    copyright?: string;
    author?: string;
};

const books: string[] = [
    "헨리 6세",
    "리처드 3세",
    "실수 연발",
    "말괄량이 길들이기",
    "헨리 8세",
];

books.forEach((book: string, idx: number, books: string[]) => {
    console.log(book, idx, books);
})

// map -> 인자로 넘긴 함수가 리턴하는 값들을 차곡차곡 모아서 하나의 배열을 만든다
const bookObject: Book[] = books.map((book:string) =>{
    return {
        title:book,
        author: undefined,
    };
});

console.log(bookObject);

const ShakespeareOneBooks: Book[] = books.map((book: string) => ({
    title:book
}))
.map((book: Book) => ({
    ...book,
    author: "William Shakespeare"
}));

console.log(`ShakespeareOneBooks ${JSON.stringify(ShakespeareOneBooks)}`)
console.log(ShakespeareOneBooks)

const bookTitleToBookObject = (book: string) => ({title:book});
const makeAuthor = (name: string) => (book: Book) => ({
    ...book,
    author: name
});

const shakespeareTwoBooks: Book[] = books
.map(bookTitleToBookObject)
.map(makeAuthor("William Shakespeare"));

console.log(shakespeareTwoBooks);

// 입력값과 출력값의 갯수가 다르다(반환값이 True인 경우만 리턴)
const henry: Book[] = shakespeareTwoBooks.filter((book: Book) =>
    book.title.includes("헨리")
);

console.log(henry);

const someNumbers: number[] = [10,5,3,14,56];

const someNumbertest = someNumbers.reduce((a:number, b:number, idx:number) => {
    console.log("a",a,"b",b,"idx",idx)
    return a + b
} , 0)
console.log("someNumbertest",someNumbertest)

const someNumber = someNumbers.reduce((a:number, b:number) => a + b , 0)

console.log(someNumber);

type SomeObject = {
    [key: string]: string | number;
};

const someObjects: SomeObject[] = [
    { border: "none"},
    { fontSize: 24},
    {className: "box sm-box"},
];

const someObject: SomeObject = someObjects.reduce(
    (a: SomeObject, b: SomeObject) => ({...a, ...b}),
    {}
);
console.log(someObject)

// function sumNumbers(): number{
//     return Array.from(arguments).reduce((a:number, b:number) => a + b, 0);
// }

// console.log(sumNumbers(10,20,30,40,50))

function sumNumbersForTypeScript(...args: number[]) : number{
    return args.reduce((a:number, b:number) => a + b , 0);
}

console.log(sumNumbersForTypeScript(10,20,30,40,50))