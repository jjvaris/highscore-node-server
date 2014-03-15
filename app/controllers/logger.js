var mongoose = require('mongoose'),
  Logger = mongoose.model('Logger');

exports.incrementPlayCount = function(req, res) {
  Logger.findOne({gameId: 1}, function (err, result) {
    if(err) return (console.log(err));
    if(!result) {
      var newLog = new Logger({gameId: 1, gamesStarted: 1});
      newLog.save(function (err) {
        if(err) return console.log(err);
        return res.end("Games Played: " + newLog.gamesStarted);
      });
    } else {
        Logger.update({gameId: 1}, { $inc: { gamesStarted: 1 } }, function(err, doc) {
          if(err) return console.log(err);
          return res.send(200);
        })
    }
  });
}

exports.getPlayCount = function(req, res) {
  Logger.findOne({gameId: 1}, function (err, result) {
    if(err) return (console.log(err));
    if(result) return res.json(result);
    else return res.send(400);
  });
}