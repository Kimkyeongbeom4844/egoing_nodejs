var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title,list,body) {
  return `<!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <a href="/create">create</a>
          ${body}
          </body>
          </html>`;
      }
function templateList(filelist){
  var list = `<ul>`;
  var i =0;
  while(i < filelist.length){
    list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`
    i = i + 1;
  }
  list = list+`</ul>`
  return list;
}
var app = http.createServer(function(request,response){
    var _url = request.url; //요청(request)한 url을 _url변수에 할당(var는 호이스팅단계에서 선언 및 초기화(undefined)가 동시에 이루어짐)
    var queryData = url.parse(_url,true).query;//url.parse(분석할url문자열,true)의 query를 보여줘라 그리고 해당 기능을 queryData변수에 저장해라
    var title = queryData.id; //qeuryData에서 id만 출력
    // console.log(queryData);
    // console.log(queryData.id);
    
    console.log(url.parse(_url,true));
    var pathname = url.parse(_url,true).pathname;

    if (pathname === '/') {
        if(queryData.id === undefined){
            fs.readdir('./data',function(err,filelist){
              console.log(filelist);
              var title = "Welcome";
              var description = "Hello, Node.js";
              var list = templateList(filelist);
              var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
              response.writeHead(200); //파일을 성공적으로 전송
              response.end(template); 
            })
      }
      else {
        fs.readdir('./data',function(err,filelist){
          console.log(filelist);
        fs.readFile(`data/${queryData.id}`,'utf8',(err,description)=>{  
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200); //파일을 성공적으로 전송
        response.end(template);
        });
      });
    }
  }
  else if(pathname === '/create') {
    fs.readdir('./data',function(err,filelist){
      console.log(filelist);
      var title = "WEB - create";
      var list = templateList(filelist);
      var template = templateHTML(title, list, `<form action="http://localhost:3000/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
          <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
      </p>
      <p>
          <input type="submit" value="서브밋">
      </p>
      </form>`);
      response.writeHead(200); //파일을 성공적으로 전송
      response.end(template); 
    })
  }
  else if(pathname === '/create_process'){
    var body = '';
    request.on('data', function(data){//데이터 들어올때 호출(계속 주기적으로 실행됨)
      body = body + data;    
    }); 
    request.on('end',function(){//더이상 들어올 데이터가 없어서 끝마칠때 호출
      console.log(body);
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(post.description);
    })

    response.writeHead(200);
    response.end('template'); 
  }
  else {
    response.writeHead(404); //파일을 찾지 못할때
    response.end("Not found");
  }
});
app.listen(3000);
