module.exports = async (req, res, next) => {
	let { body } = req;
	console.log("REQ BODY", body);
	// need to tweak the logic here to actually validate data
	let valid = global.valid;

	blockchain.validateBlockData();

	// passed middleware logic once the valid variable = true
	if (valid) {
		console.log("Validation time window open, proceeding to route...");
		next();
	} else {
		res.status(401).json({
			status: "Failed, no address has been submitted for authentication",
			message: undefined
		});
	}
};