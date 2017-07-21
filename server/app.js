const express = require('express');
const read = require('node-readability');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

var resolve = file => path.resolve(__dirname, file);
app.use(express.static(resolve('../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/generateNote', function (req, res) {
  read(req.body.link, (err, article, meta) => {
    if (err) {
      res.status(500);
      return;
    }
    res.json({
      title: article.title,
      content: article.content
    })
  });
});

app.get('*', function(req, res) {
  var html = fs.readFileSync(resolve('../dist/' + 'index.html'), 'utf-8');
  res.send(html)
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});