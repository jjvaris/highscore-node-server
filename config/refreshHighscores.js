var http = require('http'); //importing http
var config = require ('./config');

function startKeepAlive() {

  setInterval(function() {
    var options = {
      host: 'whispering-waters-6898.herokuapp.com',
      port: config.port,
      path: '/api/highscorelists'
    };
    http.get(options, function(res) {
      res.on('data', function(chunk) {
        try {
          // optional logging... disable after it's working
          console.log("HEROKU RESPONSE: " + chunk);
        } catch (err) {
          console.log(err.message);
        }
      });
    }).on('error', function(err) {
      console.log("Error: " + err.message);
    });
  }, 30 * 1000); // load every 30 secs
}

startKeepAlive();
