const { nextTick } = require('process');
var qs = require('querystring');
var url = require('url');
var db = require('./db');
var template = require('./template');

exports.home = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        if(error) {
          throw error;
        }
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}
          <img src="images/hello.jpg" style="width:300px; display:block; margin-top:10px;"`,
          `<a href="/topic/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
}

exports.page = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        if(error) {
          throw error;
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id
         WHERE topic.id=${request.params.pageId}`, function(error2, topic) {
          if(error2) {
            response.writeHead(404);
            response.end('Sorry cant find that!');
            throw error2;
          }
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>
            ${description}
            <p>by ${topic[0].name}</p>
            `,
            `<a href="/topic/create">create</a>
            <a href="/topic/update/${request.params.pageId}">update</a>
            <form action="/topic/delete_process" method="post"
            onsubmit="return confirm('정말로 삭제하시겠습니까?');">
              <input type="hidden" name="id" value="${request.params.pageId}">
              <input type="submit" value="delete">
            </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
}

exports.create = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error2, authors) {
          var title = 'Create';
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `
            <form action="/topic/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
                <p>
                  ${template.authorSelect(authors)}
                </p>
                <p>
                <input type="submit">
              </p>
            </form>
            `,
            ``
          );
          response.writeHead(200);
          response.end(html);
        });
      });
}

exports.create_process = function(request, response) {
  var post = request.body;
  db.query(`
    INSERT INTO topic (title, description, created, author_id)
      VALUES(?, ?, NOW(), ?)`,
    [post.title, post.description, post.author],
    function(error, result) {
      if(error) {
        throw error;
      }
      console.log(result.insertId);
      response.writeHead(302, {Location: `${result.insertId}`});
      response.end();
    }
  );
}

exports.update = function(request, response) {
  db.query(`SELECT * FROM topic`, function(error, topics) {
      if(error) {
        throw error;
      }
      db.query(`SELECT * FROM topic WHERE id=?`,[request.params.pageId], function(error2, topic) {
        if(error2) {
          throw error2;
        }
        db.query(`SELECT * FROM author`, function(error2, authors) {
          var list = template.list(topics);
          var html = template.HTML(topic[0].title, list,
            `
            <form action="/topic/update_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}">
            <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
            <p>
              <textarea name="description" placeholder="description">${topic[0].description}</textarea>
            </p>
            <p>
              ${template.authorSelect(authors, topic[0].author_id)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
            `,
            `<a href="/topic/create">create</a> <a href="/topic/update/${topic[0].id}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    });
}

exports.update_process = function(request, response) {
  var post = request.body;
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
    [post.title, post.description,post.author, post.id], function(error, result) {
      console.log(result);
      response.writeHead(302, {Location: `${post.id}`});
      response.end();
  });
}

exports.delete_process = function(request, response) {
  var post = request.body;
  db.query(`DELETE FROM topic WHERE id = ?`, [post.id], function(error, result) {
    if(error) {
      throw error;
    }
    response.writeHead(302, {Location: `/`});
    response.end();
  });
}