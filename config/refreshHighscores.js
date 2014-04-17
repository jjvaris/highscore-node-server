//var http = require('http'); //importing http
//var config = require ('./config');
var highscores = require('../app/controllers/highscores');

/*function startKeepAlive() {
  console.log('PORTTI '+config.port);
  setInterval(function() {
    var options = {
      host: 'localhost',
      //host: 'localhost',
      port: config.port,
      path: '/api/highscorelists'
    };
    http.get(options, function(res) {
      res.on('data', function(chunk) {
        try {
          // optional logging... disable after it's working
          //console.log("HEROKU RESPONSE: " + chunk);
        } catch (err) {
          console.log("error1 "+err.message);
        }
      });
    }).on('error', function(err) {
      console.log("Error: " + err.message);
    });
  }, 5 * 1000); // load every 30 secs
}*/

function startKeepAlive() {
  setInterval(function() {
    highscores.getDayilyWeeklyAlltime();
  }, 1 * 1000); // load every 5 secs
}

function startKeepAlive2() {
  setInterval(function() {
    highscores.removeOldHighscores();
  }, 60 * 60 * 1000); // load every 10 secs
}

startKeepAlive();
startKeepAlive2();
