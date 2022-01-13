var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url; //요청(request)한 url을 _url변수에 할당(var는 호이스팅단계에서 선언 및 초기화(undefined)가 동시에 이루어짐)
    var queryData = url.parse(_url,true).query;//url.parse(분석할url문자열,true)의 query를 보여줘라 그리고 해당 기능을 queryData변수에 저장해라
    var title = queryData.id; //qeuryData에서 id만 출력
    // console.log(queryData);
    // console.log(queryData.id);
    
    console.log(url.parse(_url,true).pathname);
    var pathname = url.parse(_url,true).pathname;

    if (pathname === '/') {
      if(queryData.id === undefined){
        fs.readFile(`data/${queryData.id}`,'utf8',(err,description)=>{
          var title = "Welcome";
          var description = "Hello, Node.js";
          var template = `
          <!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
          </body>
          </html>
        `;
        response.writeHead(200); //파일을 성공적으로 전송
        response.end(template); 
      })
    }
    else {
      fs.readFile(`data/${queryData.id}`,'utf8',(err,description)=>{
        var title = queryData.id;
        var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
        </body>
        </html>
      `;
      response.writeHead(200); //파일을 성공적으로 전송
      response.end(template);
      });
    }
    }
    else {
      response.writeHead(404); //파일을 찾지 못할때
      response.end("Not found");
    }
});
app.listen(3000);
