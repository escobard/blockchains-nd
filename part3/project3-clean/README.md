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

## Endpoints

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

## Contribution

All files in this repository are protected under the MIT license, but feel free to contribute, fork, star, or share this application as you see fit.

For commercial or educational use, please paste a link to this repository to give proper credit.

## License

As of January 9th, 2018, these files are open for all to use and contribute to. This repository is protected under the [MIT License](http://choosealicense.com/licenses/mit/).