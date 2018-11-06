'use strict';

const router = require('express').Router()

router.get('/', async (req, res) => {
	console.log('blockchain: ', blockchain);
	
  res.send(
    {
      blockchain
    });

  res.send({'sup'})


});

module.exports = router;


class Class {


}

class test {

    constructor(){
        this.change = '';
    }

}