var mongoose = require('mongoose'),
  Highscore = mongoose.model('Highscore');

var config = require('../../config/config');
var fs = require('fs');

exports.get = function(req, res){
  return Highscore.find(function(err, highscores){
    if(err) return res.send(err);
    return res.json(highscores);
  });
};

exports.getHighscoreFile = function(req, res) {
  fs.readFile('public/highscoresfile2.json', 'utf8',function(err, file) {
    if(err) return res.send(err);
    return res.end(file);
  })
};

exports.getDayilyWeeklyAlltime = function(){
  var allHighscores = {today: {}, this_week: {}, all_time: {}};
  var dateOffsetOneDay = (24*60*60*1000) * 1; //1 days
  var dateOffsetWeek = (24*60*60*1000) * 7; //7 days
  var yesterday = new Date();
  yesterday.setTime(yesterday.getTime() - dateOffsetOneDay);
  var weekAgo = new Date();
  weekAgo.setTime(weekAgo.getTime() - dateOffsetWeek);

  //daily
  Highscore.find({date: { $gte: yesterday }}).select('name score date uid').limit(10).sort({score: 'desc'}).exec(
    function(err, todayHighscores){
      if(err) return console.log(err);
      if(todayHighscores.length !== 0)
        allHighscores.today = todayHighscores;
      //weekly
      Highscore.find({date: { $gte: weekAgo}}).select('name score date uid').limit(10)
        .sort({score: 'desc'}).exec(function(err, weekAgoHighscores){
          if(err) return console.log(err);
          if(weekAgoHighscores.length !== 0)
            allHighscores.this_week = weekAgoHighscores;
          Highscore.find().select('name score date uid').limit(10).sort({score: 'desc'}).exec(
            function(err, allTimeHighscores) {
              if(err) return console.log(err);
              if(allTimeHighscores.length !== 0)
                allHighscores.all_time = allTimeHighscores;
              if(allHighscores.length !== 0)
                fs.writeFile('public/highscoresfile2.json', JSON.stringify(allHighscores), function(err) {
                  if(err) console.log(err);
                  if(todayHighscores.length !== 0)
                    Highscore.remove({date: { $gte: yesterday},
                        score: {$lt: allHighscores.today[allHighscores.today.length-1].score}}, function(err) {
                      if(err) return console.log(err);
                    });
                });
          });
      });
  });
};

exports.addHighscore = function (req, res) {
  var newHighscore = new Highscore(req.body);
  var stringToBeHashed = newHighscore.name + "-" + newHighscore.score + "+" + config.secretKey;
  var generatedHash = newHighscore.generateHash(stringToBeHashed);

  if(newHighscore.hash === generatedHash) {
    newHighscore.save(function(err) {
      if (err) return console.log(err);
      return res.json(newHighscore);
    });
  } else {
      console.log("ATTACK: hashes didnt match");
      return res.send(400);
  }
};

exports.addHighscoreEasy = function (req, res) {
  console.log(req.body);
  var newHighscore = new Highscore(req.body);
  newHighscore.save(function(err) {
    if (err) return res.json(400, err);
    return res.json(newHighscore);
  });
};

exports.removeOldHighscores = function (req, res) {
  var dateOffsetWeek = (24*60*60*1000) * 7; //7 days
  var weekAgo = new Date();
  weekAgo.setTime(weekAgo.getTime() - dateOffsetWeek);
  Highscore.find().limit(10)
    .sort({score: 'desc'}).exec(function(err, tenBestHighscores){
    if(tenBestHighscores.length != 0 )
      Highscore.remove({date: { $lt: weekAgo},
        score: {$lt: tenBestHighscores[tenBestHighscores.length-1].score}}, function(err) {
        if(err) return console.log(err);
      });
  });
}