var http = require('http'); //importing http

function startKeepAlive() {

  setInterval(function() {
    var options = {
      host: 'localhost',
      port: 3000,
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
  }, 30 * 1000); // load every minute
}

//startKeepAlive();
