// navigate to this folder and type the `node` command, then copy and pase
// the code below into the terminal node.js runtime

// this holds the block, anything passed into the class argument
// is fed into the data property within the constructor
class Block{
	
	// just like react, contains initial declarations for the class
	// we pass the data argument to the constructed to update our block information
	constructor(data){
   
   // sets these as global variables to the class, much like state
   // contains the block properties
   this.hash = "",
   this.height = 0,
   // passes the transaction hashes to the this.body property.
   this.body = data,
   this.time = 0,
   this.previousblockhash = ""
 };

};

// creates the block with some data
// new Block('SOME STRING');

// will contain the blockchain data
class Blockchain{
	
	// creates the constructor that will hold all chain data
	constructor(){
		this.chain = [];
	}

	// adds a block to the chain constructor, effectively creating a blockchain!
	addBlock(newBlock){
		this.chain.push(newBlock);
	}

}

// creates blockchain
let blockchain = new Blockchain()

// adds data to the blockchain by storing a new block within the constructor 
blockchain.addBlock(new Block('test data'));

blockchain
/* outputs:
Blockchain {
  chain:
   [ Block {
       hash: '',
       height: 0,
       body: 'test data',
       time: 0,
       previousblockhash: '' } ] }
*/