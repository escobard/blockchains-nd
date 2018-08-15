module.exports = async (req, res, next) => {
	blockchain.chain = await blockchain.fetchBlockchain();
	blockchain.setBlockHeight(blockchain.chain.length);
	if (blockchain.chain.length) {
		next();
	}
	else{
		console.log('FAILED', blockchain)
		return res
			.status(500)
			.send({ error: "No chain loaded" });
	}
	
};
