// this holds the block
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

let block = new Block('SOME STRING');
console.log('block.data', block.data)
