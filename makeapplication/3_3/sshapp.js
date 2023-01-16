const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
//불러온 content를 표시할 영역 확보
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

//동기적(false)으로 데이터를 받아오겠다
ajax.open('GET', NEWS_URL, false);
ajax.send();

//JSON 데이터로 네트워크를 통해 데이터를 받아옴
//console.log("ajax",ajax.response)

//JSON 데이터를 객체로 만들겠다
const newsFeed = JSON.parse(ajax.response);
console.log("newsFeed",newsFeed)

const ul = document.createElement('ul');

//window(브라우저창 객체)
//hashchange가 발생했을 때 뒤에 인자로 전달된 함수가 실행된다
window.addEventListener('hashchange', function() {
    
    //location(브라우저가 기본으로 제공해주는 객체: 주소와 관련한 다양한 정보 제공)
    console.log("location.hash",location.hash) // #34403684
    const id = location.hash.substr(1)
    
    ajax.open('GET', CONTENT_URL.replace('@id', id), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response)
    const title = document.createElement('h1');

    title.innerHTML = newsContent.title;

    content.appendChild(title);
    console.log("newsContent",newsContent)
})

for(let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${newsFeed[i].id}`;
    a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

    //a.addEventListener('click', function() {})

    li.appendChild(a);
    ul.appendChild(li);
}

container.appendChild(ul);
//content라는 내용을 담는 div태그를 만들었지만 
//HTML상에 어디에도 content가 추가되어있지않다
container.appendChild(content);