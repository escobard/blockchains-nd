'use strict';

const routes = require('../constants/routes');

module.exports = (app) => {

  app.use(routes.health, require('../routes/health'));
  app.use(routes.getBlock, require('../routes/getBlock'));
  app.use(routes.getHeight, require('../routes/getBlockHeight'));
  return app;
};
