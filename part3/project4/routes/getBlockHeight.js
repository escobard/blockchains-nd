'use strict';

const router = require('express').Router(),
initChain = require('../middlewares/initChain')

router.get('/', async (req, res) => {
	
	let blockHeight = blockchain.getBlockHeight(blockchain.chain.length);

	console.log('request: ', req.headers)
	console.log('blockHeight: ', blockHeight)
  res.send({
      blockHeight,
      blockchain
    })
});

module.exports = router;
