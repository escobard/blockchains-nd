'use strict';

const routes = require('../constants/routes');

module.exports = (app) => {

  app.use(routes.main, require('../routes/main'));
  app.use(routes.block, require('../routes/block'));
  app.use(routes.health, require('../routes/health'));
  app.use(routes.notary, require('../routes/notary'));
  app.use(routes.addBlock, require('../routes/addBlock'));
  app.use(routes.getBlock, require('../routes/getBlock'));
  app.use(routes.postBlock, require('../routes/postBlock'));
  app.use(routes.getHeight, require('../routes/getBlockHeight'));

  app.use(routes.requestValidation, require('../routes/requestValidation'))
};
