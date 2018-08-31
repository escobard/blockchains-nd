"use strict";

const router = require("express").Router(),
	checkSignature = require("../middlewares/checkSignature"),
bitcoin = require('bitcoinjs-lib'), // v3.x.x
bitcoinMessage = require('bitcoinjs-message');

router.post("/", checkSignature, async (req, res) => {
	let { body } = req;

	// checks to see if the request signature and wallet match globals
	if (body.address == global.address) {

		// sets the authenticated variable to true, granting user access
		global.authenticated = true;

		console.log(`Access granted, time remaining to add data: ${global.authWindow}`);
		res.status(200).json({
			registerStar: true,

			status:{
				address: global.address,
				requestTimestamp: global.timestamp,
				message: global.message,
				validationWindow: global.authWindow,
				messageSignature: bitcoinMessage.verify(global.message, body.address, body.signature)
			} 
		});
	} else {
		res.status(401).json({
			status: "Failed, stored signature values do not match request string",
			signature: body.signature,
			address: body.address
		});
	}
});

module.exports = router;