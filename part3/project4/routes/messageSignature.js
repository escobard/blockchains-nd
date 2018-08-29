"use strict";

const router = require("express").Router(),
	checkSignature = require("../middlewares/checkSignature");

router.post("/", checkSignature, async (req, res) => {
	let { body } = req;

	// checks to see if the request signature and wallet match globals
	if (body.signature == global.signature && body.address == global.address) {

		// sets the authenticated variable to true, granting user access
		global.authenticated = true;

		console.log(`Access granted, time remaining to add data: ${global.authWindow}`);
		res.status(200).json({
			status: `Access granted, time remaining to add data: ${global.authWindow}`
		});
	} else {
		res.status(401).json({
			status: "Failed, stored signature values do not match request string",
			signature,
			globalSignature: global.signature,
			address: global.address
		});
	}
});

module.exports = router;