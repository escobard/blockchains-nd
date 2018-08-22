module.exports = async (req, res, next) => {
	let { body } = req
	console.log('REQ BODY', body)
	// need to tweak the logic here to actually validate data
	let valid = false;
	
	blockchain.validateBlockData()

	// passed middleware logic once the valid variable = true
	if (valid) {
		console.log('Block is valid, adding to the chain...');
		next()
	}
	
};
