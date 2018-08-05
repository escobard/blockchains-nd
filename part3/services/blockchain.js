// import leveldb helpers here
const { getLevelDBData, populateBlockchain, addDataToLevelDB } = require("../models/utils"),

class Block {
  constructor(data) {
    (this.hash = ""),
      (this.height = 0),
      (this.body = data),
      (this.time = 0),
      (this.previousblockhash = "");
  }
}

// this should be passed into the blockchain as the main argument
let dat = populateBlockchain([]);

class Blockchain {
  constructor(data) {
    this.chain = data;
    this.height = this.chain.length;
    if (this.height === 0) {
      this.gen = new Block("Genesis block - First block in the chain");

      this.addBlock(this.gen);
    }
    this.height = this.height === 0 ? 1 : this.chain.length;
  }

  addBlock(newBlock) {
    let { chain, height } = this;
    console.log("HEIGHT", height);
    newBlock.height = height;

    newBlock.time = new Date()
      .getTime()
      .toString()
      .slice(0, -3);

    if (chain.length === 1 || height >= 2) {
      console.log("TRIGGERED");
      // sets the property of the new block as the previous block's hash
      newBlock.previousblockhash =
        // searches the block prior to this one via the array's index
        // then grabs the hash from the .hash property of the previous block
        chain[height - 1].hash;
    }

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    let jsonBlock = JSON.stringify(newBlock);
    console.log("JSON BLOCK", jsonBlock);
    addDataToLevelDB(jsonBlock);
  }

  getBlockHeight() {
    return this.chain.length;
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

let blockchain;
// runs constructor functions
setTimeout(function() {
  blockchain = new Blockchain(dat);
}, 1000);

setTimeout(function() {
    console.log("blockchain", blockchain);

  console.log("getBlockHeight returns height of chain", blockchain.getBlockHeight());
}, 2000);

setTimeout(function() {
  if (blockchain.chain.length >= 1) {
    blockchain.addBlock(new Block("test data"));
    console.log("getBlock(0) returns genesis block", blockchain.getBlock(0));
  }
  if (blockchain.chain.length >= 2) {
    console.log("validates second block", blockchain.validateBlock(1));
    console.log("validates chain", blockchain.validateChain());
  }
}, 3000);