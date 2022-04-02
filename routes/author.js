var express = require('express');
var router = express.Router();
var author = require('../lib/author');


router.get('', function(request, response) {
    author.home(request,response);
});

router.post('/create_process', function(request, response) {
    author.create_process(request, response);
});

router.get('/update/:authorId', function(request, response) {
    author.update(request,response);
});

router.post('/update_process', function(request, response) {
    author.update_process(request, response);
});

router.post('/delete_process', function(request, response) {
    author.delete_process(request, response);
});

module.exports = router;