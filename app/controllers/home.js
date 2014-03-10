var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

var fs = require('fs');

/*exports.index = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('home/index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};*/

exports.index = function(req, res) {
  fs.readFile('public/highscores.json', 'utf8',function(err, file) {
    if(err) return res.send(err);
    return res.render('home/index', {
      highscores: JSON.parse(file)
    });
  })
};