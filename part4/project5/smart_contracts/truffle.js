const mnemonic = require("./config.js");

let HDWalletProvider = require('truffle-hdwallet-provider');

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
        // this comes from the infura dashboar, unique per infura project
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/8f06b06788e046f9ba989b606c0574f1')
      },
      network_id: 4,
      gas: 7000000,
    }
  }
};
