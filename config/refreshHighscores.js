var highscores = require('../app/controllers/highscores');

function updateHighscoreFileJob() {
  setInterval(function() {
    highscores.getDayilyWeeklyAlltime();
  }, 500); // updates highscorefile every halfsecond
}

function removeOldHighscoresJob() {
  setInterval(function() {
    highscores.removeOldHighscores();
  }, 60 * 60 * 1000);
}

updateHighscoreFileJob();
removeOldHighscoresJob();
