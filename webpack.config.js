module.exports = process.env.NODE_ENV === 'development' ?
  require('./tools/webpack/development') :
  require('./tools/webpack/production');
