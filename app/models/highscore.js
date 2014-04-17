var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var md5 = require('MD5');

var path = require('path'),
  rootPath = path.normalize(__dirname + '/..');

var config = require('../../config/config');



var HighscoreSchema = new Schema({
  name: String,
  score: Number,
  uid: String,
  hash: String,
  date: { type: Date, default: Date.now }
});

/*HighscoreSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });*/

/**
 * Methods
 */
HighscoreSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  //authenticate: function(plainText) {
  //  return this.encryptPassword(plainText) === this.hashedPassword;
  //},

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  //makeSalt: function() {
   // return crypto.randomBytes(16).toString('base64');
  //},

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  generateHash: function(string) {
    return md5(string);
  },

  secretKey: function() {
    console.log("secretKey: "+config.secretKey);
    return config.secretKey;
  }
};




mongoose.model('Highscore', HighscoreSchema);
