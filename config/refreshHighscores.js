var http = require('http'); //importing http
var config = require ('./config');

function startKeepAlive() {
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
          console.log("HEROKU RESPONSE: " + chunk);
        } catch (err) {
          console.log("error1 "+err.message);
        }
      });
    }).on('error', function(err) {
      console.log("Error: " + err.message);
    });
  }, 30 * 1000); // load every 30 secs
}

startKeepAlive();
