const fs = require('fs'); //fs->노드js의 모듈인 파일시스템

fs.readFile('sample.txt','utf8', (err,data)=>{  //
    console.log(data);
})