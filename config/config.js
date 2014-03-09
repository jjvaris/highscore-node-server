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
    db: 'mongodb://localhost/clicks-node-server-development',
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
    db: 'mongodb://localhost/clicks-node-server-production',
    secretKey: security.secretKey
  }
};

module.exports = config[env];
