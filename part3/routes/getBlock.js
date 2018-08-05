'use strict';

const router = require('express').Router();

// the blockHeight route parameter is expted here, and passed back to the route
router.get('/:blockHeight', (req, res) => {
	let {headers, params} = req;
	console.log('request: ', headers)
	console.log('request parameters: ', params)
  res.status(200).json(
    {
      healthy: true,
      blockHeight: params.blockHeight
    });
});

module.exports = router;
