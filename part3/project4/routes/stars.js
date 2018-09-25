"use strict";

const router = require("express").Router();

let blockchain = require("../services/blockchain")

// the blockHeight route parameter is expted here, and passed back to the route
router.get('/:parameter/:string', async (req, res) => {
  let { params: { parameter, string } } = req;

  // returns an error if the :parameters does not match our expected values
  if (parameter !== 'hash' && parameter !== 'address') {
  	    res.send(
    {
      blocks: 'Block hash does not exist, navigate to / to see all available blocks'
    });
  }

  let blocks = blockchain.getBlock(parameter, string);
  // blockchain.validateBlock(blockHeight);
  // console.log('request: ', headers)
  // console.log('request parameters: ', params)
  console.log("block: ", blocks);


  // if block does not exist, return different response
  if (!blocks) {
    res.send(
    {
      healthy: true,
      [parameter]: string,
      blocks: 'Block does not exist - check the /getBlockHeight to check current chain height'
    });
  }

  res.send(
    {
     	[parameter]: string,
      blocks,
    });
});

module.exports = router;