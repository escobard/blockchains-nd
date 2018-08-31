'use strict';

const router = require('express').Router(),
initChain = require('../middlewares/initChain')

// checks route health, for GET cases
router.get('/', initChain, async (req, res) => {
	console.log('request: ', req.headers)
  res.status(200).json(
    {
      healthy: true
    });
});

// handles route POST requests
// expects the following json {body:{"encodedData": "dataURI with sha256", "Type": "jpeg", bitcoinWalletAddress: "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH" }}
router.post('/', initChain, async (req, res) => {
	console.log('request: ', req.headers)
  res.status(200).json(
    {
      healthy: true
    });
});


module.exports = router;
