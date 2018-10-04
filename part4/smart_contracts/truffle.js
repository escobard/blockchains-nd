let HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = "narrow close misery mandate keen armed depend achieve grant catalog fix essence"

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
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/47c181283cb345c19697f9403531914c')
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 100000000000,
    }
  }
};
