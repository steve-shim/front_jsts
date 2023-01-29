function ul(child: string): string {
    return `<ul>${child}</ul>`;
}

function ol(child: string): string {
    return `<ol>${child}</ol>`;
}

// 온전히 Li 태그들을 만드는 것에만 집중하면된다
// 바깥쪽을 ol 태그로 감쌀지 ul 태그로 감쌀지는 사용하는 쪽에서
// 함수를 인자로 넘겨주어서 결정하게 만든다 
// 함수를 인자로 넘겨줄 수 있기 때문에 가능한 프로그래밍 테크닉
function makeLI(
    container: (child: string) => string,
    contents: string[]
): string {
    const liList = [];

    for (const content of contents) {
        liList.push(`<Li>${content}</Li>`)
    }

    return container(liList.join(''));
}

// 함수 자체를 값으로서 넘기는 패턴
const htmlUL = makeLI(ul, ['월', '화', '수','목','금','토','일']);
const htmlOL = makeLI(ol, ['봄', '여름', '가을', '겨울']);

console.log(htmlUL);
console.log(htmlOL);
