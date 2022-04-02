var express = require('express');
var router = express.Router();
var topic = require('../lib/topic');

router.get('/', function(request, response) {
topic.home(request, response);
});

module.exports = router;