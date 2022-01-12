var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(url);
    console.log(_url);
    var queryData = url.parse(_url,true).query;
    console.log(queryData);
    console.log(queryData.name);
    /*if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404); //파일을 찾을 수 없을 때
      response.end();
      return;
    } */
    response.writeHead(200); //파일을 찾았을 때
    response.end("Hello!!!");
});
app.listen(3000);