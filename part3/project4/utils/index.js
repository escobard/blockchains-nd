let blockchain = require("../services/blockchain");

let initChain = async () => {
	let chain = await blockchain.fetchBlockchain();
	blockchain.setBlockHeight(chain.length);
	return blockchain;
}

module.exports = initChain();