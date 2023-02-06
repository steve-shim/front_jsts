import { AnyObject } from './types';
import App from './app';

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
    },
    daum: any,
  }
}

const app = new App('#root', {
  title: 'Javascript & TypeScript Essential Chapter 5 - Sign up'
});

app.render();

/*
App 클래스 UI는 기본적으로 index.html에 있는 빈 div id가 root인 태그만을 container로 사용한다
그래서 render 메소드에서 container.innerHTML 에다가 데이터를 그냥 밀어 넣고 있다 

같은 container를 쓴다고 하면 
이름을 innerHTML로 넣고, 아이디도 innerHTML로 넣으면 앞에 이름 텍스트 필드가 사라짐

그렇게 않으려면 모든 개별 요소들을 container를 마련해 줘야하는데 굉장히 불편

innerHTML로 만들지 말고 
container를 공유하는 UI들은 개별 요소들을 해당하는 container에 계속 append만 시키고 
추가할 수 있다면 굳이 container를 여러 개 만들 필요가 없다

*/
 