module.exports = async (req, res, next) => {
	let { body } = req;
	// passed middleware logic once the global authentication
	// variable exists, and wallet addresses match
	if (!global.authenticated) {
		res.status(401).json({
			status: "Failed, no authentication window, visit /requestValidation",
			authenticated: false
		});
	} else {
		if (global.authenticated && body.address === global.address) {
			console.log(
				`Addresses match and authentication window is open for ${authWindow} minutes, proceeding to route...`
			);
			next();
		} else if (body.address != global.address) {
			res.status(401).json({
				status:
					"Failed, submitted address and authenticated address do not match!",
				address: body.address
			});
		}
	}
};