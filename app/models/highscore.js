var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('MD5');
var config = require('../../config/config');

var HighscoreSchema = new Schema({
  name: String,
  score: Number,
  uid: String,
  hash: String,
  date: { type: Date, default: Date.now }
});

/**
 * Methods
 */
HighscoreSchema.methods = {
  generateHash: function(string) {
    return md5(string);
  },

  secretKey: function() {
    return config.secretKey;
  }
};

mongoose.model('Highscore', HighscoreSchema);
