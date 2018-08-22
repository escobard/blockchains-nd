"use strict";

const router = require("express").Router(),
	checkSignature = require("../middlewares/checkSignature");

router.get("/", checkSignature, async (req, res) => {
	let { body } = req;
	if (body === global.signature) {
		console.log('`Access granted, time remaining to add data: ${authWindow}`')
		res.status(200).json({
			status: `Access granted, time remaining to add data: ${authWindow}`
		});
	} else {
		res.status(401).json({
			status: "Failed, stored signature values do not match request string",
			message: body
		});
	}
});

module.exports = router;