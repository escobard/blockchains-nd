'use strict';

const router = require('express').Router(),
checkValidation = require('../middlewares/')
// the route here is replaced by the route passed within ./index.js
router.get('/', checkValidation, async (req, res) => {
	console.log('request: ', req.headers)
  res.status(200).json(
    {
      healthy: true
    });
});

module.exports = router;
