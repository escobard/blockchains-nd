# Project 5 - Decentralized Star Notary

This project was built as part of the BCND beta, to fulfill the criteria of `Project 5 - Decentralized star notary`

## Transaction information:

New Star Transaction hash: `0x655e5e4d04688e84932b2203cb8b31ce3870262a222e29628c13e33be39013ce`

Star tokenId:`12`

Contract address: `0xd7bd75459e31151ab54164a6fa1cd8729c8f26be`

Contract hash: `0xD7Bd75459E31151Ab54164A6Fa1CD8729c8F26be`

## Installation and usage

1) Navigate to the `/` parent directory.
2) Navigate to the parent directory.
3) Open the index.html file with Chrome.
4) 
8) Create your own star by filling out the form.

## Testing

1) Navigate to the `/smart_contracts` folder
2) Start a ganache node, currently set to use the desktop application instead of cli.
    - To change this to CLI head to `./truffle.js` and change line 10 from `7545` to `8545`.
3) Once ganache is up and running, run the command `truffle test`
4) 18 tests should pass with various functionality of the 3 token contracts. 

## Deployment

1) Navigate to the `/smart_contracts` folder
2) Open `truffle.js`
3) Change the `mnemonic` variable value on `line 3` to your own rinkeby mnemonic.
4) Change the `URI on line 16 to infura` with your own `pod URI`
5) Run the `truffle migrate --network rinkeby --reset` command.