var fs = require('fs');

console.log("A");
fs.readFile('syntax/sample.txt','utf-8',(err,result)=>{ //비동기방식
    console.log(result);
});
console.log("C");

// console.log("A");
// var result = fs.readFileSync('syntax/sample.txt','utf-8');
// console.log(result);
// console.log("C");