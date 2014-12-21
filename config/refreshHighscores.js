var highscores = require('../app/controllers/highscores');

function updateHighscoreFileJob() {
  setInterval(function() {
    highscores.getDayilyWeeklyAlltime();
  }, 1000); // updates highscorefile every second
}

function removeOldHighscoresJob() {
  setInterval(function() {
    highscores.removeOldHighscores();
  }, 60 * 60 * 1000);
}

updateHighscoreFileJob();
removeOldHighscoresJob();
