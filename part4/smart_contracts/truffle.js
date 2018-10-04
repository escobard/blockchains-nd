let HDWalletProvider = require('truffle-hdwaller-provider');

var mnemonic = "https://github.com/OpenZeppelin/openzeppelin-solidity"

module.exports = {
  networks:{
    development:{
      host: '127.0.0.1',

      // expects desktop ganache client, change to 8545 for cli
      port: 7545,
      network_id: "*"
    },
    rinkeby:{
      provider: () =>{

      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 100000000000,
    }
  }
};
