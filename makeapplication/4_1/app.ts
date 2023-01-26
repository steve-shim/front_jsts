
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

interface RouteInfo {
  path: string;
  page: View;
}

//const ajax: XMLHttpRequest = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store: Store = {
  currentPage: 1,
  feeds: [],
};

class Api {
  url: string;
  ajax: XMLHttpRequest;
  // 생성자 -> 외부로부터 데이터를 받고 this.속성을 활용해서 내부에 저장을 해놔야함
  // 내부 저장목적으로 클래스 내부 속성 url,ajax 추가
  // this: 클래스 내부요소로 접근(인스턴스 객체에 접근하는 지시어)
  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  // 코드의 집합은 함수로 묶는다
  // API class를 확장한 하위 class에서 사용할 용도로 만든 메소드
  // 내부로직 처리 메소드고 외부 노출이 안되게하고자 한다면 protected를 쓴다
  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response);
  }
}

// getData는 바깥쪽에서 API 호출(인스턴스.getData())을 위해서 사용하는 용도로 만든 메소드
class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    // 상위클래스(Api)의 메소드 혹은 특성들은 인스턴스 객체(this)를 통해서 접근 가능
    return this.getRequest<NewsFeed[]>();
  }
}

class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}

// View -> NewsFeedView
// View -> NewsDetailView
abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    if (!containerElement) {
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다'
    }
    //class에 속성이 들어가면 항상 생성자에서 초기화를 해줘야한다
    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }

  //html 문자열 조각을 추가하는 기능 메소드 제공(데이터에 직접 접근 제한)
  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('');
    //this.htmlList = []
    //직접 지우기 보다는 메소드를 활용하여 데이터에 접근하는게 더좋다
    this.clearHtmlList();
    return snapshot;
  } 

  protected setTemplateData(key: string, value: string): void {
    //this.template = this.template.replace(`{{__${key}__}}`, value)
    //원본에 직접 replace하는 대신 복사본에 replace 진행
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value)
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  //View 클래스를 상속받은 자식 클래스는 해당 매소드를 반드시 구현하라고 하는 의미의 마킹
  //추상메서드 -> 추상메서드를 가진 클래스는 클래스 자체가 abstract 키워드를 가지고 있어야한다
  abstract render(): void;
}

class Router {
  routeTable: RouteInfo[];
  defaultRoute: RouteInfo | null;

  constructor() {
    //hash EventHandler
    window.addEventListener('hashchange', this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
    // if (routePath === '') {
    //   newsFeed();
    // } else if (routePath.indexOf('#/page/') >= 0) {
    //   store.currentPage = Number(routePath.substr(7));
    //   newsFeed();
    // } else {
    //   newsDetail()
    // }
    }

    setDefaultPage(page: View): void {
      this.defaultRoute = { path: '', page }
    }

    addRoutePath(path: string, page: View): void {
      this.routeTable.push({
        path: path,
        page: page,
      })
      //Key와 Value 값이 같은 경우에는 생략 가능
      //this.routeTable.push({ path, page })
    }

    route() {
      const routePath = location.hash;

      if (routePath === '' && this.defaultRoute) {
        this.defaultRoute.page.render()
        //모든 View page class는 View class를 상속받고 
        //UI를 업데이트하는 메서드는 render라는 동일한 이름을 갖고 있다
        //어떤 메서드가 UI를 업데이트하는지 알 수 없기에 최소한의 약속 필
      }

      for (const routeInfo of this.routeTable) {
        if (routePath.indexOf(routeInfo.path) >= 0) {
          routeInfo.page.render();
          break;
        }
      }

    }

}


// class를 만든다는 것은 인스턴스에 필요한 정보들을 저장해 뒀다가 
// 필요한 경우에 기존 인스턴스를 활용해서 계속 재활용해서 쓸 수 있다는 장점이 있어서 사용
// constructor() {}: 생성자 함수에 모든 로직이 다들어가 있으면
// 해당 로직을 실행시키기 위해서 인스턴스를 매번 새로 생성해야하는 문제가 있다
// 기존 인스턴스 재활용x (클래스 사용하는 이유가 없)
class NewsFeedView extends View {
  private api: NewsFeedApi;
  private feeds: NewsFeed[];
  
  constructor(containerId: string) {
    // 상위 클래스를 상속 받을거면 반드시 상위 class의 생성자를 명시적으로 호출해 줘야한다
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
    super(containerId, template);

    this.api = new NewsFeedApi(NEWS_URL);
    this.feeds = store.feeds;

    // 제네릭: 호출하는쪽에서 리턴받을 타입을 명시해주면 getData에서 해당 타입으로 반환해준다
    // 단순 리턴을 Union으로 기술되어 있으면 리턴될때 목록(NewsFeed)이 리턴될지 내용(NewsDetail)이 리턴될지 애매한 상황이 된다
    if (this.feeds.length === 0) {
      //newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL));
      //호출하는 쪽에서 제네릭은 명시하지 않아도 되고 URL을 인자로 넘기지 않아도된다 
      //+ NewsFeedApi 클래스로 인스턴스를 만드니까 가독성도 좋아짐
      this.feeds = store.feeds = this.api.getData();
      this.makeFeeds(); 
    }
  }
  
  render(): void {
    // default page 일때는 현재 page 1, next prev할때는 hash값에서 가져오기
    store.currentPage = Number(location.hash.substr(7) || 1);

    for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
      const {id, title, comments_count, user, points, time_ago, read} = this.feeds[i];
      this.addHtml(`
        <div class="p-6 ${read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
          <div class="flex">
            <div class="flex-auto">
              <a href="#/show/${id}">${title}</a>  
            </div>
            <div class="text-center text-sm">
              <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
            </div>
          </div>
          <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
              <div><i class="fas fa-user mr-1"></i>${user}</div>
              <div><i class="fas fa-heart mr-1"></i>${points}</div>
              <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
            </div>  
          </div>
        </div>    
      `);
    }

    // 데이터에 직접 접근하는 안좋은 방식
    // template = template.replace('{{__news_feed__}}', this.getHtml());
    // template = template.replace('{{__prev_page__}}', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
    // template = template.replace('{{__next_page__}}', String(store.currentPage + 1));
    // 데이터에 간접 접근하는 기능을 제공
    this.setTemplateData('news_feed', this.getHtml());
    this.setTemplateData('prev_page', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
    this.setTemplateData('next_page', String(store.currentPage + 1));

    this.updateView();
  }

  private makeFeeds(): void {
    for (let i = 0; i < this.feeds.length; i++) {
      this.feeds[i].read = false;
    }
  }
}

class NewsDetailView extends View {
  constructor(containerId: string) {
    let template = `
      <div class="bg-gray-600 min-h-screen pb-8">
        <div class="bg-white text-xl">
          <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-6">
              <div class="flex justify-start">
                <h1 class="font-extrabold">Hacker News</h1>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="h-full border rounded-xl bg-white m-6 p-4 ">
          <h2>{{__title__}}</h2>
          <div class="text-gray-400 h-20">
            {{__content__}}
          </div>

          {{__comments__}}

        </div>
      </div>
    `;
    super(containerId, template);
  }

  render() {
    const id = location.hash.substr(7);
    const api = new NewsDetailApi(CONTENT_URL.replace('@id', id))
    //const newsContent = getData<NewsDetail>(CONTENT_URL.replace('@id', id))
    const newsContent = api.getData();

    for(let i=0; i < store.feeds.length; i++) {
      if (store.feeds[i].id === Number(id)) {
        store.feeds[i].read = true;
        break;
      }
    }

    this.setTemplateData('comments', this.makeComment(newsContent.comments))
    this.setTemplateData('currentPage', String(store.currentPage))
    this.setTemplateData('title', newsContent.title)
    this.setTemplateData('content', newsContent.content)

    this.updateView()
  }

  makeComment(comments: NewsCommnet[]): string {
    for(let i = 0; i < comments.length; i++) {
      const comment: NewsCommnet = comments[i];
      
      console.log("comments.length",comments.length); 
      console.log("comments[i].level", comments[i].level) 
      this.addHtml(`
        <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${comment.user}</strong> ${comment.time_ago}
          </div>
          <p class="text-gray-700">${comment.content}</p>
        </div>      
      `);
  
      if (comment.comments.length > 0) {
        this.addHtml(this.makeComment(comment.comments));
      }
    }
  
    return this.getHtml();
  }
}

const router: Router = new Router();
const newsFeedView = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();