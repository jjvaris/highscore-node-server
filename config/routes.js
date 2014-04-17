module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
  var highscores = require('../app/controllers/highscores');
  var logger = require('../app/controllers/logger');
	app.get('/', home.index);

  //app.get('/api/highscores', highscores.get);
  app.post('/api/highscores', highscores.addHighscore);
  app.post('/api/highscoresTest', highscores.addHighscoreEasy);
//  app.get('/api/highscorelists', highscores.getDayilyWeeklyAlltime);
  app.get('/api/highscorefile', highscores.getHighscoreFile);

  app.get('/api/test', highscores.removeOldHighscores);
  app.get('/api/increasePlayCount', logger.incrementPlayCount);
  app.get('/api/getPlayCount', logger.getPlayCount);

};
