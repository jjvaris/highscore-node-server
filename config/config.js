var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    security = require('./security');

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'clicks-node-server'
    },
    port: 3000,
    db: 'mongodb://heroku_app22886915:mgn91iolj61pgr06or56lcafsc@ds033069.mongolab.com:33069/heroku_app22886915',
    //db: 'mongodb://localhost/clicks-node-server-development',
    secretKey: security.secretKey
  },

  test: {
    root: rootPath,
    app: {
      name: 'clicks-node-server'
    },
    port: 3000,
    db: 'mongodb://localhost/clicks-node-server-test',
    secretKey: security.secretKey
  },

  production: {
    root: rootPath,
    app: {
      name: 'clicks-node-server'
    },
    port: 3000,
    db: 'mongodb://heroku_app22886915:mgn91iolj61pgr06or56lcafsc@ds033069.mongolab.com:33069/heroku_app22886915',
    secretKey: security.secretKey
  }
};

module.exports = config[env];
