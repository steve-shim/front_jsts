//DOM API를 사용하면 UI의 구조가 잘 드러나지x
//DOM API를 최대한 사용하지 않고 문자열만들 가지고 UI를 만든다 

const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
//불러온 content를 표시할 영역 확보
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

//공통된 코드를 묶는 구조로서 함수사용
//변수들을 묶는 구조로 객체사용  
function getData(url) {
    //동기적(false)으로 데이터를 받아오겠다
    ajax.open('GET', url, false);
    ajax.send();

    //JSON 데이터로 네트워크를 통해 데이터를 받아옴
    return JSON.parse(ajax.response);
}


//JSON 데이터를 객체로 만들겠다
const newsFeed = getData(NEWS_URL);
console.log("newsFeed",newsFeed)

const ul = document.createElement('ul');

//window(브라우저창 객체)
//hashchange가 발생했을 때 뒤에 인자로 전달된 함수가 실행된다
window.addEventListener('hashchange', function() {
    
    //location(브라우저가 기본으로 제공해주는 객체: 주소와 관련한 다양한 정보 제공)
    console.log("location.hash",location.hash) // #34403684
    const id = location.hash.substr(1)
    
    const newsContent = getData(CONTENT_URL.replace('@id', id))
    const title = document.createElement('h1');

    container.innerHTML = `
        <h1>${newsContent.title}</h1>
        <div>
            <a href="#">목록으로</a>
        </div>
    `;
    // title.innerHTML = newsContent.title;

    // content.appendChild(title);
    // console.log("newsContent",newsContent)
})

const newsList = [];

newsList.push('<ul>')
for(let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    
    newsList.push(`
    <li>
        <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
    `);
}
newsList.push('</ul>')

container.innerHTML = newsList.join('')