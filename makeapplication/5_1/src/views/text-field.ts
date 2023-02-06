import { nextTick } from '../utils';
import { ValidateRule } from '../types';
import template from './text-field.template';
import { RequireRule } from '../constant';

type Props = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
  text?: string;
  require: boolean;
}

const DefaultProps: Props = {
  id: '',
  text: '',
  label: 'label',
  type: 'text',
  placeholder: '',
  require: false,
};

export default class TextField {
  private template = template;
  private container: string;
  private data: Props;  
  private updated: boolean = false;
  private validateRules: ValidateRule[] = [];

  // 사용자한테 데이터를 입력받고, 그중에 입력 안된건 DefaultProps로 처리하고
  // 나머지는 사용자가 준 데이터로 덮어써서 내부 데이터로 사용
  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }

  private validate = (): ValidateRule | null => {
    const target = this.data.text ? this.data.text.trim() : '';

    const invalidateRules = this.validateRules
      .filter(validateRule => validateRule.rule.test(target) !== validateRule.match);

    return (invalidateRules.length > 0) ? invalidateRules[0] : null;
  }

  private buildData = () => {
    const isInvalid: ValidateRule | null = this.validate();

    if (this.updated) {
      return {
        ...this.data, 
        updated: this.updated,
        valid: !isInvalid,
        validateMessage: !!isInvalid ? isInvalid.message : ''
      }
    } else {
      return {
        ...this.data, 
        updated: this.updated,
        valid: true,
        validateMessage: ''
      }
    }
  }

  private onChange = (e: Event) => {
    const { value, id } = e.target as HTMLInputElement;
    
    /*
    최초 접속했을 때 아무것도 입력이 안된 상태는 update=false
    뭔가라도 업데이트를 했다면 update=true가 된다
    */
    if (id === this.data.id) {
      this.updated = true;
      this.data.text = value;
      this.update();
    }
  }

  private attachEventHandler = () => {
    document.querySelector(this.container)?.addEventListener('change', this.onChange);
  }

  private update = () => {
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement;
    const docFrag = document.createElement('div');

    docFrag.innerHTML = this.template(this.buildData());
    container.innerHTML = docFrag.children[0].innerHTML;
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    return this.data.text || '';
  }

  public get isValid(): boolean {
    return !this.validate();
  }

  public addValidateRule = (rule:ValidateRule) => {
    this.validateRules.push(rule);
  }

  public render = (append: boolean = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.buildData());

      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.buildData());
    }
  }
}

/*
append=True일 때,
div를 하나 만들어서 template에 렌더링한 html을 새로 만든 div안에 넣고
그 div의 children, 방금 template은 html이니까 이걸 append하기 위해선 
DOM모드로 만들고 container에 append한다
*/
