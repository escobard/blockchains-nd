"use strict";

const router = require("express").Router();

let blockchain = require("../services/blockchain"),
initChain = require('../middlewares/initChain')

// the blockHeight route parameter is expted here, and passed back to the route
router.post("/", async (req, res) => {
  let { headers, params, body: { body } } = req;
  
        // adds block data based on route parameters
        blockchain.addBlock(body);

        new Promise((resolve, reject) => {
          let newChain;
          setTimeout(function() {
            newChain = blockchain.fetchBlockchain();
          }, 250);
          setTimeout(function() {
            resolve(newChain);
          }, 500);
        }).then(newChain => {
          // sets the blockchain service data with data from leveldb
          blockchain.chain = newChain;
          let newBlock = blockchain.getBlock(blockchain.height);
          // logs the blockchain
          console.log("request:", body);
          console.log("New Block:", newBlock);

          res.send({
            healthy: true,
            responseData: `added new block with the following data: ${body}`,
            newBlock,
            blockchain
          });
        });
});

module.exports = router;