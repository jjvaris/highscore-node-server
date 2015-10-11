var mongoose = require('mongoose');

var fs = require('fs');

exports.index = function(req, res) {
  fs.readFile('public/highscoresfile.json', 'utf8',function(err, file) {
    if(err) return res.send(err);
    return res.render('home/index', {
      highscores: JSON.parse(file)
    });
  })
};