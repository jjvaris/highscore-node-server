var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LoggerSchema = new Schema({
  gamesStarted: { type: Number, default: 0 },
  gameId: { type: Number, default: 1 }
});

mongoose.model('Logger', LoggerSchema);