const ajax = new XMLHttpRequest();

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';

//동기적(false)으로 데이터를 받아오겠다
ajax.open('GET', NEWS_URL, false);
ajax.send();

//JSON 데이터로 네트워크를 통해 데이터를 받아옴
//console.log("ajax",ajax.response)

//JSON 데이터를 객체로 만들겠다
const newsFeed = JSON.parse(ajax.response);
console.log("newsFeed",newsFeed)

document.getElementById('root').innerHTML = `
    <ul>
        <li>${newsFeed[0].title}</li>
        <li>${newsFeed[1].title}</li>    
        <li>${newsFeed[2].title}</li>        
    </ul>`;