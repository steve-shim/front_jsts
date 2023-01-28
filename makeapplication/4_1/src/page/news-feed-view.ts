import View from '../core/view';
import { NewsFeedApi } from '../core/api';
import { NewsFeed } from '../types';
import { NEWS_URL } from '../config';

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
// class를 만든다는 것은 인스턴스에 필요한 정보들을 저장해 뒀다가 
// 필요한 경우에 기존 인스턴스를 활용해서 계속 재활용해서 쓸 수 있다는 장점이 있어서 사용
// constructor() {}: 생성자 함수에 모든 로직이 다들어가 있으면
// 해당 로직을 실행시키기 위해서 인스턴스를 매번 새로 생성해야하는 문제가 있다
// 기존 인스턴스 재활용x (클래스 사용하는 이유가 없)
export default class NewsFeedView extends View {
    private api: NewsFeedApi;
    private feeds: NewsFeed[];
    
    constructor(containerId: string) {
      // 상위 클래스를 상속 받을거면 반드시 상위 class의 생성자를 명시적으로 호출해 줘야한다
      super(containerId, template);
  
      this.api = new NewsFeedApi(NEWS_URL);
      this.feeds = window.store.feeds;
  
      // 제네릭: 호출하는쪽에서 리턴받을 타입을 명시해주면 getData에서 해당 타입으로 반환해준다
      // 단순 리턴을 Union으로 기술되어 있으면 리턴될때 목록(NewsFeed)이 리턴될지 내용(NewsDetail)이 리턴될지 애매한 상황이 된다
      if (this.feeds.length === 0) {
        //newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL));
        //호출하는 쪽에서 제네릭은 명시하지 않아도 되고 URL을 인자로 넘기지 않아도된다 
        //+ NewsFeedApi 클래스로 인스턴스를 만드니까 가독성도 좋아짐
        this.feeds = window.store.feeds = this.api.getData();
        this.makeFeeds(); 
      }
    }
    
    render(): void {
      // default page 일때는 현재 page 1, next prev할때는 hash값에서 가져오기
      window.store.currentPage = Number(location.hash.substr(7) || 1);
  
      for(let i = (window.store.currentPage - 1) * 10; i < window.store.currentPage * 10; i++) {
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
      this.setTemplateData('prev_page', String(window.store.currentPage > 1 ? window.store.currentPage - 1 : 1));
      this.setTemplateData('next_page', String(window.store.currentPage + 1));
  
      this.updateView();
    }
  
    private makeFeeds(): void {
      for (let i = 0; i < this.feeds.length; i++) {
        this.feeds[i].read = false;
      }
    }
  }