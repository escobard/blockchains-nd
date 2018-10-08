# Lesson 4

## Visibility / getters

- https://solidity.readthedocs.io/en/v0.4.24/contracts.html#visibility-and-getters
    - Public: Part of the contract interface which can be either called internally or by users.
    - Private: Visible / accessible for the contract only.
    - Internal: Visible / accessible for the contract or contract children. 
    - External: Included within the contract interface, can only be called by other contracts / users, cannot be called internally. 

## OpenZeppelin

- `npm init y` initiates npm file with all base settings
- using V2.0.0 of openzeppelin for now
- https://github.com/OpenZeppelin/openzeppelin-solidity
- helpful for using pre-determined contracts, will choose not to use for now

## Infura

- useful interface to track smart contract deployment, and data on any given network
- need to update `maindir/truffle.js` file with address, mnemonic, and other meta data.
- need to request funds to deploy contracts to test network: https://faucet.rinkeby.io/
- https://infura.io/register
- https://infura.io/dashboard
- command to actually deploy is `truffle deploy --network rinkeby --reset`
    - the --reset flag is necessary, if accounts change, should run every time just in case
- not working too well, neet to check again tonight if worth deploying