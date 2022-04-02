var express = require('express');
const { authorSelect } = require('./lib/template');
var app = express()
var topic = require('./lib/topic');
var author = require('./lib/author');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));
app.use('/topic', topicRouter);


app.get('/', function(request, response) {
  topic.home(request, response);
});

app.get('/author', function(request, response) {
  author.home(request,response);
});

app.post('/author/create_process', function(request, response) {
  author.create_process(request, response);
});

app.get('/author/update/:authorId', function(request, response) {
  author.update(request,response);
});

app.post('/author/update_process', function(request, response) {
  author.update_process(request, response);
});

app.post('/author/delete_process', function(request, response) {
  author.delete_process(request, response);
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})


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