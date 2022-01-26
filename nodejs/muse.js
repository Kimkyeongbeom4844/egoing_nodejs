// var M = { //mpart.js에 모듈화 시킴
//     v : 'v',
//     f : function(){
//         console.log(this.v);
//     }
// }\
var m = require('./mpart.js');

console.log(m);
m.f();