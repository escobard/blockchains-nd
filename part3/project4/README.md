# README - Quiz Book - react-native && react-redux  

## Project Criteria

The main purpose of this application is to meet the project criteria for the third project of the Blockchains Nanodegree by Udacity.

## Installation

Install NPM dependencies:
```
$ npm install
```

## Usage

To run this application locally for development, use the following commands:

```
$ npm start
```

## Endpoints - project 3

### GET Endpoint - /

Navigating to this page will display the entire blockchain, and populate the blockchain with a genesis block if there is no data

### GET Endpoint - /block/:blockHeight

Returns the block passed into the :blockHeight parameters.

### GET Endpoint - /addblock/:blockContent

Any characters preceeding the /addblock route will create a new block with the parameters. Any new blocks are immediately shown by the response.

### GET Endpoint - /getblockheight

Returns the entire height of the the blockchain

### GET Endpoint - /health

Returns a simple JSON response, tests API health

## Enpoints - project 4 

### POST endpoint - /requestValidation

Expects a `valid BTC` address, (checked with web3), expects the following parameters: 

```
POST URL path: http://localhost:8000/requestValidation
Content-Type: application/json
Request body: {"address":"sampleAddressHash - 1PzeKjDk2gZwyW1UJ1QHB6vRe46szektWz"}
```

Returns the following JSON message:

```
[walletAddress]:[timeStamp]:starRegistry
```

Grants the user a `5 minute authentication window`, handled by `the validation util within ../utils.js`

### POST endpoint - /message-signature/validate

Expect a `valid BTC` address, must match the `authenticated address` returned within the `/requestValidation` endpoint.

```
POST URL path: http://localhost:8000/requestValidation
Content-Type: application/json
Request body: {"address":"sampleAddressHash - 1PzeKjDk2gZwyW1UJ1QHB6vRe46szektWz", "message":"message signature hash, received from /requestValidation - 1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck:1535400871:starRegistry"}
```

Validates the user's address, allows users to register a star.

### POST Endpoint - /block

Expect:
```
- a `valid BTC` address
- must match the `authenticated address` returned within the `/requestValidation` endpoint. 
- must include a star and address property within the body
- star story must be hex encoded, can only contain ascii characters, a max length of 250 must be enforced. 

```
POST URL path: http://localhost:8000/block
Content-Type: application/json
Request body: {star:{story:"hex encoded string, when decoded contains ascii characters only, with a max length of 250 words", coordinates}, address:"validated bitcoin address"}
```


## Contribution

All files in this repository are protected under the MIT license, but feel free to contribute, fork, star, or share this application as you see fit.

For commercial or educational use, please paste a link to this repository to give proper credit.

## License

As of January 9th, 2018, these files are open for all to use and contribute to. This repository is protected under the [MIT License](http://choosealicense.com/licenses/mit/).