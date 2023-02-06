// 디렉터리의 파일 구성이 바뀌면 import하는 쪽에서 코드를 매번 수정해줘야한다
// 특정한 디렉터리 하위에 index.ts를 두고 여기서 자기 하위에 있는 디렉터리의 클래스를 
// export하는 것들을 밖으로 중개해 주는 코드를 만들어 놓으면 
// 사용하는 쪽에서는 편리하게 해당하는 디렉터리만 지정해놓고 내가 빼서 쓸 것만 지정하면 된다
// (하위 밑에 어떤 식으로 파일이 구성되어 있는지 신경 쓰지 않아도 되는 구성 상의 이득을 얻는다)
// 사용하는 쪽: src/app.ts,
// 선언하는 쪽: src/types/index.ts, src/views/index.ts   

import template from './app.template';
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit } from './constant';
import { AnyObject } from './types';
import { TextField, PasswordField, AddressField } from './views';

// 기본적으로 모든 view는 탬플릿을 갖고 있어야하므로 template 속성을 갖고있고
// template을 렌더링 하기 위해선 데이터를 주입하고 그 데이터랑 믹싱 돼서 최종적인 html을 만든다

export default class App {
  template = template;
  data: AnyObject;
  container: HTMLElement;
  fields: AnyObject[];
  active: boolean = false;

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];

    this.initialize();
    
    setInterval(this.validFieldMonitor, 1000/30);
  }

  private initialize = () => {
    const nameField = new TextField('#required-fields', { 
      id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요', require: true,
    });

    const idField = new TextField('#required-fields', { 
      id: 'id', label: '아이디', type: 'text', placeholder: '아이디를 입력해주세요', require: true,
    });

    const emailField = new TextField('#required-fields', { 
      id: 'email', label: '이메일', type: 'email', placeholder: '이메일을 입력해주세요', require: true,
    });
    
    const passwordField = new PasswordField('#required-fields', { 
      id: 'password', label: '비밀번호', placeholder: '비밀번호를 입력해주세요', 
    });

    const addressField = new AddressField('#optional-fields', {
      id: 'address', label: '배송지 주소',
    });

    idField.addValidateRule(CantContainWhitespace);
    idField.addValidateRule(CantStartNumber);
    idField.addValidateRule(MinimumLengthLimit(3));

    emailField.addValidateRule(CantContainWhitespace);

    this.fields.push(nameField);
    this.fields.push(idField);
    this.fields.push(emailField);
    this.fields.push(passwordField);
    this.fields.push(addressField);
  }

  private validFieldMonitor = () => {
    const btnJoin = this.container.querySelector('#btn-join') as HTMLButtonElement;

    if (this.fields.filter(field => field.isValid).length === this.fields.length) {
      this.active = true;
      btnJoin.classList.remove('bg-gray-300');
      btnJoin.classList.add('bg-green-500');
    } else {
      this.active = false;
      btnJoin.classList.remove('bg-green-500');
      btnJoin.classList.add('bg-gray-300');
    }
  }

  private onSubmit = (e: Event) => {
    e.preventDefault();

    if (!this.active) return;

    const submitData: AnyObject = this.fields
        .map(field => ({ [field.name]: field.value }))
        .reduce((a, b) => ({ ...a, ...b }), {});

    console.log(submitData);
  }

  // 모든 view클래스는 render라고 하는 메소드를 가지고 있다
  // 역할: 템플릿에 데이터를 넣고 그 템플릿을 최종적인 html로 만든 다음 container에 붙이는 거다. -> UI 업데이트하게 된다는 뜻
  public render = () => {
    this.container.innerHTML = this.template(this.data);
    this.fields.forEach(field => {
      field.render(true);
    }); 

    // 최종적인 submit 제출을 눌렀을 때 
    // onSubmit이라고 하는 내부 메소드에 연결
    this.container.addEventListener('submit', this.onSubmit);
  }
}
