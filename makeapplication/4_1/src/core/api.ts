import { NewsFeed, NewsDetail } from '../types';

export class Api {
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
export class NewsFeedApi extends Api {
    getData(): NewsFeed[] {
      // 상위클래스(Api)의 메소드 혹은 특성들은 인스턴스 객체(this)를 통해서 접근 가능
      return this.getRequest<NewsFeed[]>();
    }
}
  
export class NewsDetailApi extends Api {
    getData(): NewsDetail {
      return this.getRequest<NewsDetail>();
    }
}