"use strict";

const router = require("express").Router();

let blockchain = require("../services/blockchain");

// the blockHeight route parameter is expted here, and passed back to the route
router.post("/", (req, res) => {
  let { headers, params, body : {body} } = req;
  new Promise((resolve, reject) => {
    let chain = blockchain.fetchBlockchain();
    setTimeout(function() {
      resolve(chain);
    }, 250);
  })
    .then(chain => {
      
      
      // sets block height
      blockchain.setBlockHeight(chain.length);

      // sets the blockchain service data with data from leveldb
      blockchain.chain = chain;

      // checks block height, create genesis
      if (blockchain.height === 0) {
        console.log("Populating blockchain with genesis block...");
        blockchain.createGenesis();
      }

      // adds block data based on route parameters
      return blockchain.addBlock(body)
  })
    .then((block) =>{ 
    let chain = blockchain.fetchBlockchain();
      return chain;
  })
    .then((chain) =>{
      setTimeout(function() {

      // sets the blockchain service data with data from leveldb
      blockchain.chain = chain;
      let newBlock = blockchain.getBlock(blockchain.height - 1);
      // logs the blockchain
      console.log("request:", body);
      console.log("New Block:", newBlock);

      res.send({
        healthy: true,
        responseData: `added new block with the following data: ${
          body
        }`,
        newBlock,
        blockchain
      });
    }, 500);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;