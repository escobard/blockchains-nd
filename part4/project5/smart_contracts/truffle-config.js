let HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = "kiss vintage describe snake barrel dream almost chronic jewel vicious scene base"

module.exports = {
  networks:{
    rinkeby:{
      provider: () =>{
        // this comes from the infura dashboar, unique per infura project
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/0c60810f8481480ab0e5e14d12d0e644')
      },
      network_id: 4,
      gas: 45000,
      gasPrice: 1000,
    }
  }
};
