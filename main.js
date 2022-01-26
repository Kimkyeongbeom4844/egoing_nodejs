var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var template = require('./lib/template.js'); 
// var template = {
//   HTML : function (title,list,body, control) {
//     return `<!doctype html>
//             <html>
//             <head>
//             <title>WEB1 - ${title}</title>
//             <meta charset="utf-8">
//             </head>
//             <body>
//             <h1><a href="/">WEB</a></h1>
//             ${list}
//             ${control}
//             ${body}
//             </body>
//             </html>`;
//         },
//   List : function (filelist){
//     var list = `<ul>`;
//     var i =0;
//     while(i < filelist.length){
//       list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`
//       i = i + 1;
//     }
//     list = list+`</ul>`
//     return list;
//   }
// }
var app = http.createServer(function(request,response){
    var _url = request.url; //요청(request)한 url을 _url변수에 할당(var는 호이스팅단계에서 선언 및 초기화(undefined)가 동시에 이루어짐)
    var queryData = url.parse(_url,true).query;//url.parse(분석할url문자열,true)의 query를 보여줘라 그리고 해당 기능을 queryData변수에 저장해라
    var title = queryData.id; //queryData에서 id만 출력
    // console.log(queryData);
    // console.log(queryData.id);
    
    console.log(url.parse(_url,true));
    console.log(_url);
    var pathname = url.parse(_url,true).pathname;

    if (pathname === '/') {
        if(queryData.id === undefined){
            fs.readdir('./data',function(err,filelist){
              console.log(filelist);
              var title = "Welcome";
              var description = "Hello, Node.js";
              var list = template.List(filelist);
              var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
              response.writeHead(200); //파일을 성공적으로 전송
              response.end(html); 
            })
      }
      else {
        fs.readdir('./data',function(err,filelist){
          var filteredId = path.parse(queryData.id).base;
          // console.log(filelist);
        fs.readFile(`data/${filteredId}`,'utf8',(err,description)=>{  
          var title = queryData.id;
          var list = template.List(filelist);
          var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a> <form action="delete_process" method="post"><input type="hidden" name="id" value="${title}"><input type="submit" value="delete"></form>`);
        response.writeHead(200); //파일을 성공적으로 전송
        response.end(html);
        });
      });
    }
  }
  else if(pathname === '/create') {
    fs.readdir('data',function(err,filelist){
      console.log(filelist);
      var title = "WEB - create";
      var list = template.List(filelist);
      var html = template.HTML(title, list, `<form action="/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
          <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
      </p>
      <p>
          <input type="submit" value="서브밋">
      </p>
      </form>`,'');
      response.writeHead(200); //파일을 성공적으로 전송
      response.end(html); 
    })
  }
  else if(pathname === '/create_process'){
    var body = '';
    request.on('data', (data)=>{//데이터 들어올때 호출(계속 주기적으로 실행됨)
      body = body + data;    
    }); 
    request.on('end',(err)=>{//더이상 들어올 데이터가 없어서 끝마칠때 호출
      console.log(body);
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(post.description);
      fs.writeFile(`data/${title}`,description,'utf8',function(err){
        response.writeHead(302, {Location : `/?id=${title}`});//페이지를 다른곳으로 redirection 시켜라
        response.end();
      })
    })
  }
  else if(pathname === '/update') {
    fs.readdir('./data',function(err,filelist){
      var filteredId = path.parse(queryData.id).base;
      // console.log(filelist);
    fs.readFile(`data/${filteredId}`,'utf8',(err,description)=>{  
      var title = queryData.id;
      var list = template.List(filelist);
      var html = template.HTML(title, list,`<form action="/update_process" method="post">
      <input type="hidden" name="id" value="${title}">
      <p><input type="text" name="title" placeholder="title" value="${title}"></p>
      <p>
          <textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea>
      </p>
      <p>
          <input type="submit" value="서브밋">
      </p>
      </form>`,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200); //파일을 성공적으로 전송
        response.end(html);
        });
    });
  }
  else if(pathname === '/update_process'){
    var body = '';
    request.on('data', (data)=>{//데이터 들어올때 호출(계속 주기적으로 실행됨)
      body = body + data;    
    }); 
    request.on('end',(err)=>{//더이상 들어올 데이터가 없어서 끝마칠때 호출
      console.log(body);
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`,`data/${title}`,(err)=>{
        fs.writeFile(`data/${title}`,description,'utf8',function(err){
          response.writeHead(302, {Location : `/?id=${title}`});//페이지를 다른곳으로 redirection 시켜라
          response.end();
        })
      })
      console.log(post);
    })
  }
  else if(pathname === '/delete_process'){
    var body = '';
    request.on('data', (data)=>{//데이터 들어올때 호출(계속 주기적으로 실행됨)
      body = body + data;    
    }); 
    request.on('end',(err)=>{//더이상 들어올 데이터가 없어서 끝마칠때 호출
      console.log(body);
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(err){
        response.writeHead(302, {Location : `/`});//페이지를 다른곳으로 redirection 시켜라
        response.end();
      })
      console.log(post);
    })
  }
  else {
    response.writeHead(404); //파일을 찾지 못할때
    response.end("Not found");
  }
});
app.listen(3000);
