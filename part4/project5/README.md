# Project 5 - Decentralized Star Notary

This project was built as part of the BCND beta, to fulfill the criteria of `Project 5 - Decentralized star notary`

## Transaction information:

New Star Transaction hash: `0xf5c1908963d040c7d96520874ff4a8e0a11e96730xd7bd75459e31151ab54164a6fa1cd8729c8f26be0x6352211e000000000000000000000000000000000000000000000000000000000000000c`

Star tokenId:`12`

Contract address: `0xD7Bd75459E31151Ab54164A6Fa1CD8729c8F26be`

Contract hash: ` 0xa4c7cc8b07b8bdc71b9e9fe483e022a0a2a83f6567fc46fce7fe2129d1d4c63f`

## Installation and usage

1) Navigate to the `/smart_contracts` folder
2) Run `npm install` to install dependencies, `truffle` must be installed `globally`
3) Navigate to the parent directory.
4) Ensure ganache desktop is running.
5) Open the index.html file with Chrome.
6) Navigate to this file `./README.md`.
7) Use the transaction hash, tokenId, contractAddress, and contract hash provided.

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