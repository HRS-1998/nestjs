class A{
    a:any
    constructor(name:string){
        this.a=name
    }
}

class C{
    c:any
    constructor(name:string){
        this.c=name
    }
}

class Container{
    model:any
    constructor(){
        this.model={}
    }
    provide(key:string,value:any){
        this.model[key]=value
    }
    get(key){
        return this.model[key]
    }
}

const mo=new Container()
mo.provide('a',new A('这是a的值'))
mo.provide('c',new C('这是c的值'))

class B{
    a:any
    c:any
    constructor(model:Container){
        this.a=model.get('a')
        this.c=model.get('c')
    }
}

const m=new B(new Container())
console.log(m)

