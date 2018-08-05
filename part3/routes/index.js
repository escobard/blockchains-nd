'use strict';

const routes = require('../constants/routes');

module.exports = (app) => {

  app.use(routes.health, require('../routes/health'));
  return app;
};
