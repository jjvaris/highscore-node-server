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
  fs.readFile('public/highscores.json', 'utf8',function(err, file) {
    if(err) return res.send(err);
    return res.end(file);
  })
};

exports.getDayilyWeeklyAlltime = function(req, res){
  var allHighscores = {today: {}, this_week: {}, all_time: {}};
  var dateOffsetOneDay = (24*60*60*1000) * 1; //1 days
  var dateOffsetWeek = (24*60*60*1000) * 7; //7 days
  var yesterday = new Date();
  yesterday.setTime(yesterday.getTime() - dateOffsetOneDay);
  var weekAgo = new Date();
  weekAgo.setTime(weekAgo.getTime() - dateOffsetWeek);

  //daily
  Highscore.find({date: { $gte: yesterday }}, {_id: 0}).select('name score date').limit(10).sort({score: 'desc'}).execFind(
    function(err, todayHighscores){
      if(err) return res.send(err);
      if(todayHighscores.length !== 0)
        allHighscores.today = todayHighscores;
      //weekly
      Highscore.find({date: { $gte: weekAgo}}, {_id: 0}).select('name score date').limit(10)
        .sort({score: 'desc'}).execFind(function(err, weekAgoHighscores){
          if(err) return res.send(err);
          if(weekAgoHighscores.length !== 0)
            allHighscores.this_week = weekAgoHighscores;
          Highscore.find({},{_id: 0}).select('name score date').limit(10).sort({score: 'desc'}).execFind(
            function(err, allTimeHighscores) {
              if(err) return res.send(err);
              if(allTimeHighscores.length !== 0)
                allHighscores.all_time = allTimeHighscores;
              //remove
              Highscore.remove({date: { $gte: yesterday},
                score: {$lt: allHighscores.today[allHighscores.today.length-1].score}},
                function() {
                  fs.writeFile('public/highscores.json', JSON.stringify(allHighscores), function(err) {
                    if(err) console.log(err);
                    else console.log("highscores saved");
                    return res.json(allHighscores);
                  })
              })
          })
      })
  });
  //alltime
};

/*
 Highscore.remove({date: { $gte: yesterday},
 score: {$lt: allHighscores.today[allHighscores.today.length-1].score}},
 function() {
 return res.json(allHighscores);
 })

 */


exports.addHighscore = function (req, res) {
  var newHighscore = new Highscore(req.body);
  var stringToBeHashed = newHighscore.score + "+" + newHighscore.name + "-" + config.secretKey;
  var generatedHash = newHighscore.generateHash(stringToBeHashed);

  if(newHighscore.hash === generatedHash) {
    newHighscore.save(function(err) {
      if (err) return res.json(400, err);
      console.log("hashes matched");
      return res.json(newHighscore);
    });
  } else {
      return res.send(400);
  }
};

exports.addHighscoreEasy = function (req, res) {
  var newHighscore = new Highscore(req.body);


    newHighscore.save(function(err) {
      if (err) return res.json(400, err);
      return res.json(newHighscore);
    });
};


//TODO: palauta 3 highscore listaa, päivän, viikon, alltime
//puhdista highscore listat