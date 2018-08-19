'use strict';

const router = require('express').Router(),
initChain = require('../middlewares/initChain')

router.get('/', initChain, async (req, res) => {
	console.log('blockchain: ', blockchain);
	
  res.send(
    {
      blockchain
    });
});

module.exports = router;
