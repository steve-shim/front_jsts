//DOM API를 사용하면 UI의 구조가 잘 드러나지x
//DOM API를 최대한 사용하지 않고 문자열만들 가지고 UI를 만든다 

const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
//불러온 content를 표시할 영역 확보
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

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

    title.innerHTML = newsContent.title;

    content.appendChild(title);
    console.log("newsContent",newsContent)
})

for(let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    // const li = document.createElement('li');
    // const a = document.createElement('a');

    // a.href = `#${newsFeed[i].id}`;
    // a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;
    
    //문자열안에 들어있는 태그를 DOM요소로 바꿔줘야하는데
    //innerHTML의 속성을 제공해주는 임시 DOM(div)이 필요
    div.innerHTML = `
    <li>
        <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
    `
    // li.appendChild(a);
    // ul.appendChild(li);
    //ul태그의 자식으로 div 태그는 필요없고 ul태그 하위로 li태그들이 필요하다
    //ul.appendChild(div.children[0]);
    ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
//content라는 내용을 담는 div태그를 만들었지만 
//HTML상에 어디에도 content가 추가되어있지않다
container.appendChild(content);