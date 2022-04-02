var express = require('express');
const { authorSelect } = require('./lib/template');
var app = express()
var topic = require('./lib/topic');
var author = require('./lib/author');
var bodyParser = require('body-parser');
var compression = require('compression');
// var helmet = require('helmet');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var authorRouter = require('./routes/author');

// app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/author', authorRouter);


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})