import { RouteInfo } from '../types';
import View from './view';
//export가 여러개인 파일에서 import 해올 때는 비구조 할당처럼 가져와야하고
//export default 처럼 하나만 import 해올 때는 import 뒤에 바로 사용할 이름을 적어주면 된다

export default class Router {
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