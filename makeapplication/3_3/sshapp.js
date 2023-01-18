//DOM API를 사용하면 UI의 구조가 잘 드러나지x
//DOM API를 최대한 사용하지 않고 문자열만들 가지고 UI를 만든다 

const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
//불러온 content를 표시할 영역 확보
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

//여러 함수들에 걸쳐서 접근하는 공유되는 자원들을 하나로 묶어 둠
const store = {
    currentPage: 1,
}

//공통된 코드를 묶는 구조로서 함수사용
//변수들을 묶는 구조로 객체사용  
function getData(url) {
    //동기적(false)으로 데이터를 받아오겠다
    ajax.open('GET', url, false);
    ajax.send();

    //JSON 데이터로 네트워크를 통해 데이터를 받아옴
    return JSON.parse(ajax.response);
}

function newsFeed() {
    const newsFeed = getData(NEWS_URL);
    const newsList = [];

    newsList.push('<ul>')
    for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
        newsList.push(`
        <li>
            <a href="#/show/${newsFeed[i].id}">
                ${newsFeed[i].title} (${newsFeed[i].comments_count})
            </a>
        </li>
        `);
    }
    newsList.push('</ul>')
    newsList.push(`
        <div>
            <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
            <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
        </div>
    `);
    container.innerHTML = newsList.join('')
}

function newsDetail() {
    //location(브라우저가 기본으로 제공해주는 객체: 주소와 관련한 다양한 정보 제공)
    console.log("location.hash",location.hash) // #34403684
    const id = location.hash.substr(7)
    
    const newsContent = getData(CONTENT_URL.replace('@id', id))
    const title = document.createElement('h1');

    container.innerHTML = `
        <h1>${newsContent.title}</h1>
        <div>
            <a href="#/page/${store.currentPage}">목록으로</a>
        </div>
    `;
}

function router() {
    //routePath를 보고 글 목록을 보여줄지 글 내용을 보여줄지 결정
    const routePath = location.hash
    console.log("routePath",routePath)
    if (routePath === '') { 
        // location.hash에 #만 들어가는 경우엔 빈값을 반환
        //글 목록
        newsFeed();
    } else if (routePath.indexOf('#/page/') >= 0) { 
        //입력으로 주어진 문자열이 있으면 페이지 화면  
        //글 목록(페이지 정보 반영)
        store.currentPage = Number(routePath.substr(7));
        newsFeed();
    } else {
        //입력으로 주어진 문자열이 없으면 글 본문 화면  
        //글 본문
        newsDetail()
    }
}

//window(브라우저창 객체)
//hashchange가 발생했을 때 뒤에 인자로 전달된 함수가 실행된다
window.addEventListener('hashchange', router)

router()
