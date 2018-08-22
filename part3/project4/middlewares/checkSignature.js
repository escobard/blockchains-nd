module.exports = async (req, res, next) => {
	let { body } = req;
	console.log("REQ BODY", body);
	// need to tweak the logic here to actually signatureate data
	// this variable is probably unecessary to declare, should test if removing is OK
	let signature = global.signature;

	// passed middleware logic once the signature variable = true
	if (signature) {
		console.log("Validation time window open, proceeding to route...");
		next();
	} else {
		res.status(401).json({
			status: "Failed, no address has been submitted for authentication",
			message: undefined
		});
	}
};