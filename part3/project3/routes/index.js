'use strict';

const routes = require('../constants/routes');

module.exports = (app) => {

  app.use(routes.main, require('../routes/main'));
  app.use(routes.health, require('../routes/health'));
  app.use(routes.addBlock, require('../routes/addBlock'));
  app.use(routes.getBlock, require('../routes/getBlock'));
  app.use(routes.postBlock, require('../routes/postBlock'));
};
