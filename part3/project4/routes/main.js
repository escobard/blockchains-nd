'use strict';

const router = require('express').Router(),
initChain = require('../middlewares/initChain')

router.get('/', initChain, async (req, res) => {

	// logs the blockchain
	console.log('blockchain: ', blockchain);
	
  res.send(
    {
      blockchain
    });
});

module.exports = router;
