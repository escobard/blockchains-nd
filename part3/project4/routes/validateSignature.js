"use strict";

const router = require("express").Router(),
	checkSignature = require("../middlewares/checkSignature");

router.get("/", checkSignature, async (req, res) => {
	let { body } = req;

	// checks to see if the request signature and wallet match globals
	if (body.signature === signature && body.address === address) {

		// sets the authenticated variable to true, granting user access
		global.authenticated = true;

		console.log('`Access granted, time remaining to add data: ${authWindow}`')
		res.status(200).json({
			status: `Access granted, time remaining to add data: ${authWindow}`
		});
	} else {
		res.status(401).json({
			status: "Failed, stored signature values do not match request string",
			signature
		});
	}
});

module.exports = router;