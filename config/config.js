var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    security = require('./security');

var port = Number(process.env.PORT || 5000);
var db = process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/clicks-node-server-development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'clicks-node-server'
    },
    port: port,
    //db: 'mongodb://heroku_app22886915:mgn91iolj61pgr06or56lcafsc@ds033069.mongolab.com:33069/heroku_app22886915',
    db: db,
    secretKey: security.secretKey
  },

  test: {
    root: rootPath,
    app: {
      name: 'clicks-node-server'
    },
    port: port,
    db: 'mongodb://localhost/clicks-node-server-test',
    secretKey: security.secretKey
  },

  production: {
    root: rootPath,
    app: {
      name: 'clicks-node-server'
    },
    port: port,
    db: db,
    secretKey: security.secretKey
  }
};

module.exports = config[env];
