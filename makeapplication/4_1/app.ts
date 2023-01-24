
// type Store = {
//   currentPage: number;
//   feeds: NewsFeed[];
// }
// feeds: NewsFeed 유형의 데이터가 들어가는 배열

// TypeAlias를 interface 방식으로 변경
interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

// 코드상에서 값을 변경하지 못하게 막으려면 readonly type을 추가한다
// 실수로 request하는 값을 변경해서 서버에 저장된 정보와 mismatch 방지
interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

// 공통 Type과 자신만의 Type을 intersection으로 공통 Type 제거
// extends News Type을 기반으로 새로운 키값도 추가 가능 
interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean;
}

interface NewsDetail extends News {
  readonly comments: NewsCommnet[];
}

interface NewsCommnet extends News {
  // id: number;
  // user: string;
  // time_age: string;
  // content: string;
  readonly comments: NewsCommnet[];
  readonly level: number;
}

const container: HTMLElement | null = document.getElementById('root');
const ajax: XMLHttpRequest = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store: Store = {
  currentPage: 1,
  feeds: [],
};

// function getData(url: string): NewsFeed[] | NewsDetail
function getData<AjaxResponse>(url: string): AjaxResponse {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function makeFeeds(feeds: NewsFeed[]): NewsFeed[] {
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }

  return feeds;
}

function updateView(html: string): void {
  if (container != null) {
    container.innerHTML = html;
  } else {
    console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다.')
  }
  // container가 null을 반환하는 경우에는 innerHTML속성에 접근하지 못하므로 경고
}

function newsFeed(): void {
  let newsFeed: NewsFeed[] = store.feeds;
  const newsList = [];
  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div> 
        </div>
      </div>
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}        
      </div>
    </div>
  `;

  // 제네릭: 호출하는쪽에서 리턴받을 타입을 명시해주면 getData에서 해당 타입으로 반환해준다
  // 단순 리턴을 Union으로 기술되어 있으면 리턴될때 목록(NewsFeed)이 리턴될지 내용(NewsDetail)이 리턴될지 애매한 상황이 된다
  if (newsFeed.length === 0) {
    newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL));
  }

  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <div class="p-6 ${newsFeed[i].read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
            <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
            <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
          </div>  
        </div>
      </div>    
    `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
  template = template.replace('{{__next_page__}}', String(store.currentPage + 1));
  
  updateView(template);
}

function newsDetail(): void {
  const id = location.hash.substr(7);
  const newsContent = getData<NewsDetail>(CONTENT_URL.replace('@id', id))
  let template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>${newsContent.title}</h2>
        <div class="text-gray-400 h-20">
          ${newsContent.content}
        </div>

        {{__comments__}}

      </div>
    </div>
  `;

  for(let i=0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }
  updateView(template.replace('{{__comments__}}', makeComment(newsContent.comments)))
}

function makeComment(comments: NewsCommnet[]): string {
  const commentString = [];

  for(let i = 0; i < comments.length; i++) {
    const comment: NewsCommnet = comments[i];

    console.log("comments.length",comments.length); 
    console.log("comments[i].level", comments[i].level) 
    commentString.push(`
      <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
        <div class="text-gray-400">
          <i class="fa fa-sort-up mr-2"></i>
          <strong>${comment.user}</strong> ${comment.time_ago}
        </div>
        <p class="text-gray-700">${comment.content}</p>
      </div>      
    `);

    if (comment.comments.length > 0) {
      commentString.push(makeComment(comment.comments));
    }
  }

  return commentString.join('');
}

function router(): void {
  const routePath = location.hash;

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail()
  }
}

window.addEventListener('hashchange', router);

router();
