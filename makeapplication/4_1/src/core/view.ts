export default abstract class View {
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
  