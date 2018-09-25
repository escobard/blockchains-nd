// import leveldb helpers here
const SHA256 = require("crypto-js/sha256");
const Datauri = require("datauri");

const { hexToAscii, asciiToHex } = require("../utils");

const Block = require('../models/block')

class Blockchain {
  constructor(data) {
    this.chain = [];
    this.height = 0;
    this.initChain()
  }
  async fetchBlockchain() {
    return level.populateBlockchain([]);
  }
  createGenesis() {
    this.addBlock("Genesis block - First block in the chain");
  }
  addBlock(data) {
    let { height, chain } = this;
    this.height = this.chain.length;
    console.log("HEIGHT", height);
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
      newBlock.body.star.star_story = asciiToHex(newBlock.body.star.star_story);
    }

    // encodes star story

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    let jsonBlock = JSON.stringify(newBlock);
    // console.log("JSON BLOCK", jsonBlock);
    // console.log("CHAIN IN BLOCK CREATION", this.chain);
    level.addDataToLevelDB(jsonBlock);
  }
  async populateBlockchain(blockchain) {
    this.height = blockchain.length;
    this.chain = blockchain;
      console.log(this)
    if(!blockchain.length){
      this.createGenesis();
    }
  }
  getHeight() {
    let height = 0;
    return level.addDataToLevelDB("", height);
  }

  getBlock(parameter, string, ignoreDecode) {
    // creates an array to store multiple blocks in case of same address
    let array = [];
    this.height = this.chain.length;
    this.chain.forEach(block => {

      // handles genesis
      if (block.height === 0 && !block.body.star) {
        let { hash, height, body } = block;
        if (block.height == string || block.hash === string) {
          array.push(block);
        }
      }

      // handles non-genesis
      else {
        let { hash, height, body: { star: { address } } } = block;

        // checks if ignoreDecode case is in effect
        if(!ignoreDecode){

          // decodes body.start.story from hex to readable text
          block.body.star.star_story = hexToAscii(block.body.star.star_story);
        }

        // checks to see if parameters match the string, has OR case for address
        console.log('BLOCK PARAMETER', block[parameter])
        if (
          block[parameter] == string ||
          block.body[parameter] == string
        ) {
          array.push(block);
        }
      }
    });
    return array;
  }
  validateBlockData(blockData) {
    // contains logic to validate data

    // contains the blockImage SHA256 encrypted data URI
    let image = blockData.image;
    // turns test image into static URI
    let datauri = new Datauri("./assets/kitty.jpg");

    // this should work, need to test, turns image data back to pure data URI
    let decrypted = SHA256(JSON.stringify(datauri)).toString();

    // checks for exact match
    if (decrypted === image) {
      console.log("VALIDATED");
    } else {
      console.log("NOT VALIDATED");
    }
  }
  validateBlock(blockHeight) {
    let block = this.getBlock(blockHeight);

    let blockHash = block.hash;

    block.hash = "";

    let validBlockHash = SHA256(JSON.stringify(block)).toString();

    if (blockHash === validBlockHash) {
      console.log(`Block is valid!`);
      block.hash = blockHash;
    } else {
      console.log(
        "Block #" +
          blockHeight +
          " invalid hash:\n" +
          blockHash +
          "<>" +
          validBlockHash
      );
    }
  }

  validateChain() {
    let errorLog = [];
    for (var i = 0; i <= this.chain.length; i++) {
      if (!this.validateBlock(i)) errorLog.push(i);
      if (!this.chain[i + 1]) {
        console.log("No errors detected");
        return;
      }
      let blockHash = this.chain[i].hash;
      let previousHash = this.chain[i + 1].hash;

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
  async initChain(){
    let fetchedChain = await this.fetchBlockchain();
    if (!fetchedChain){
      return 'Chain is undefined!'
    }
    this.populateBlockchain(fetchedChain);

  }
}

module.exports = new Blockchain();