var express = require('express')
var app = express()
var template = require('./lib/template');
var db = require('./lib/db');
var topic = require('./lib/topic');
var url = require('url');
var path = require('path');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', function(request, response) {
  topic.home(request, response);
  // return request.send('Hello World!')
});

app.get('/page/:pageId', function(request, response) {
  topic.page(request, response);
  // var _url = request.url;
  // var queryData = url.parse(_url, true).query;
  // var queryData = path.parse(request.params.pageId).base;

  // console.log(_url);
  // console.log(queryData);
  // console.log(queryData);
  // console.log(request.url);
  // return response.send(request.params);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})


// if(queryData.id === undefined) {
//   topic.home(request, response);
// } else {
  // topic.page(request, response);


/*
var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template');
var db = require('./lib/db');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if(pathname === '/') {
    if(queryData.id === undefined) {
      topic.home(request, response);
    } else {
      topic.page(request, response);
    }
  } else if(pathname === '/create') {
    topic.create(request, response);
  } else if(pathname === '/create_process') {
    topic.create_process(request, response);
  } else if(pathname === '/update') {
    topic.update(request, response);
  } else if(pathname === '/update_process') {
    topic.update_process(request, response);
  } else if(pathname === '/delete_process') {
    topic.delete_process(request, response);
  } else if(pathname === '/author') {
    author.home(request,response);
  } else if(pathname === '/author/create_process') {
    author.create_process(request, response);
  } else if(pathname === '/author/update') {
    author.update(request, response);
  } else if(pathname === '/author/update_process') {
    author.update_process(request, response);
  } else if(pathname === '/author/delete_process') {
    author.delete_process(request, response);
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});

app.listen(3000);
*/