'use strict';

const routes = require('../constants/routes');

module.exports = (app) => {

	// project 3 routes
  app.use(routes.main, require('../routes/main'));
  app.use(routes.health, require('../routes/health'));
  app.use(routes.addBlock, require('../routes/addBlock'));
  app.use(routes.postBlock, require('../routes/postBlock'));
  app.use(routes.getHeight, require('../routes/getBlockHeight'));

  // project 4 routes
  app.use(routes.requestValidation, require('../routes/requestValidation'))
  app.use(routes.messageSignature, require('../routes/messageSignature'))
  app.use(routes.block, require('../routes/block'));
};
