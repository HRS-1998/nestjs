var A = /** @class */ (function () {
    function A(name) {
        this.a = name;
    }
    return A;
}());
var C = /** @class */ (function () {
    function C(name) {
        this.c = name;
    }
    return C;
}());
var Container = /** @class */ (function () {
    function Container() {
        this.model = {};
    }
    Container.prototype.provide = function (key, value) {
        this.model[key] = value;
    };
    Container.prototype.get = function (key) {
        return this.model[key];
    };
    return Container;
}());
var model = new Container();
model.provide('a', new A('这是a的值'));
model.provide('c', new C('这是c的值'));
console.log(model);
