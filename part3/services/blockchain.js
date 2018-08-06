// import leveldb helpers here
const SHA256 = require("crypto-js/sha256");

const { checkHeight, getLevelDBData, populateBlockchain, addDataToLevelDB } = require("../models/utils");

class Block {
  constructor(data) {
    (this.hash = ""),
      (this.height = 0),
      (this.body = data),
      (this.time = 0),
      (this.previousblockhash = "");
  }
}

class Blockchain {
  constructor(data) {
    this.chain = [];
    this.height = 0;
    if (this.height === 0) {
      this.addBlock("Genesis block - First block in the chain");
    }
  }
  fetchBlockchain(blockchain){
    let array = new Promise((resolve, reject) => {
      // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
      // In this example, we use setTimeout(...) to simulate async code. 
      // In reality, you will probably be using something like XHR or an HTML5 API.
      let chain = populateBlockchain(blockchain)
      console.log('CHAIN WITHIN', chain.length)
      if (chain.length ===0) {
        reject('Chain pending...')
      }
      else{
        resolve(chain);
      }
      
    }).then((chain) =>{
      console.log('BLOCKCHAIN OUT', chain);
      console.log('BLOCKCHAIN LENGTH OUT', chain.length);
    }).catch(err =>{
      console.log(err)
    })
    
    
  }
  addBlock(data) {
    let { height, chain } = this;
    // console.log("HEIGHT", height);
    // defines block with data
    let newBlock = new Block(data);
    newBlock.height = height;

    newBlock.time = new Date()
      .getTime()
      .toString()
      .slice(0, -3);

    if (height >= 1) {
      // console.log("TRIGGERED");
      // sets the property of the new block as the previous block's hash
      newBlock.previousblockhash =
        // searches the block prior to this one via the array's index
        // then grabs the hash from the .hash property of the previous block
        chain[height - 1].hash;
    }

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    let jsonBlock = JSON.stringify(newBlock);
    // console.log("JSON BLOCK", jsonBlock);
    // console.log("CHAIN IN BLOCK CREATION", this.chain);
    addDataToLevelDB(jsonBlock);
  }

  getBlockHeight(blockchain) {
    if (this.height === 0) {
      let height = this.chain.length;
      // console.log('LENGTH AT 0', height);
    }
    this.height = blockchain;
    // console.log('CHAIN LENGTH', blockchain)
    return this.height;
  }
  getHeight(){
    let height = 0;
    return addDataToLevelDB("", height)
  }
  getBlock(blockHeight) {
    return this.chain[blockHeight]
  }

  validateBlock(blockHeight) {
    let block = this.getBlock(blockHeight);

    let blockHash = block.hash;

    block.hash = "";

    let validBlockHash = SHA256(JSON.stringify(block)).toString();

    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log(
        "Block #" +
          blockHeight +
          " invalid hash:\n" +
          blockHash +
          "<>" +
          validBlockHash
      );
      return false;
    }
  }

  validateChain() {
    let errorLog = [];
    for (var i = 0; i < this.chain.length - 1; i++) {
      if (!this.validateBlock(i)) errorLog.push(i);

      let blockHash = this.chain[i].hash;
      let previousHash = this.chain[i + 1].previousBlockHash;
      if (blockHash !== previousHash) {
        errorLog.push(i);
      }
    }
    if (errorLog.length > 0) {
      console.log("Block errors = " + errorLog.length);
      console.log("Blocks: " + errorLog);
    } else {
      console.log("No errors detected");
    }
  }
}



module.exports = new Blockchain();

// runs constructor functions
/* 
setTimeout(function() {
    console.log("blockchain", blockchain);

  console.log("getBlockHeight returns height of chain", blockchain.getBlockHeight());
}, 1000);


setTimeout(function() {
  if (blockchain.chain.length >= 1) {
    blockchain.addBlock("test data");
    console.log("getBlock(0) returns genesis block", blockchain.getBlock(0));
  }
  if (blockchain.chain.length >= 2) {
    console.log("validates second block", blockchain.validateBlock(1));
    console.log("validates chain", blockchain.validateChain());
  }
}, 3000);*/
