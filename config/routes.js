module.exports = function(app){

  var highscores = require('../app/controllers/highscores');
  var logger = require('../app/controllers/logger');

  //add highscores using MD5 hash
  app.post('/api/highscores', highscores.addHighscore);

  //add highscores without hash - use this only for testing
  app.post('/api/highscoresEasy', highscores.addHighscoreEasy);

  //get highscores
  app.get('/api/highscorefile', highscores.getHighscoreFile);

  //for monitoring number of games played
  app.get('/api/increasePlayCount', logger.incrementPlayCount);
  app.get('/api/getPlayCount', logger.getPlayCount);

};
