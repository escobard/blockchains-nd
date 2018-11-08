'use strict';

const router = require('express').Router()

router.get('/', async (req, res) => {
  let chain = await blockchain.fetchBlockchain();
  blockchain.chain = chain;
  res.send(
    {
      blockchain
    });

});

module.exports = router;