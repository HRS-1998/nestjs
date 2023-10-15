//类装饰器
const doc_1: ClassDecorator = (target: any) => {
  console.log(target); // log： [class Demo_1]
  target.prototype.name = "装饰器_1";
};

@doc_1
class Demo_1 {
  constructor() {}
}
// doc(Demo)
const demo: any = new Demo_1();
console.log(demo.name); // log： '装饰器_1'

//属性装饰器、
const doc_2: PropertyDecorator = (target: Object, key: string | symbol) => {
  console.log(target, key); // log： {} as
};
class Demo_2 {
  public name: string;
  @doc_2
  public as: string;
  constructor() {
    this.name = "装饰器_2";
    this.as = "";
  }
}

//方法装饰器
const doc_3: MethodDecorator = (
  target: Object,
  key: string | symbol,
  descriptor: any
) => {
  console.log(target, key, descriptor); // log： {} getName {   value: [Function: getName],   writable: true,   enumerable: false,   configurable: true}
  let methods = descriptor.value;
 methods('1','2')
};
class Demo_3 {
  public name: string;
  as: string;
  constructor() {
    this.name = "装饰器_3";
    this.as = "ss";
  }
  @doc_3
  getName(a:any,b:any){
    console.log("Method", a,b);
    
  }
}

//参数装饰器
const doc_4: ParameterDecorator = (
  target: Object,
  key: string | symbol | undefined,
  parameterIndex: number
) => {
  console.log(target, key, parameterIndex); // log： parameterIndex 参数所在位置
};
class Demo_4 {
  public name: string;
  as: string;
  constructor() {
    this.name = "装饰器_4";
    this.as = "ss";
  }
  getName(name: string, @doc_4 age: number): string {
    console.log("Method", this.name);
    return this.name;
  }
}

//   let a=function A(){}
//   let b=a
//   a=function(...args){
//     console.log('1')
//   }

//   console.log(a,b)
