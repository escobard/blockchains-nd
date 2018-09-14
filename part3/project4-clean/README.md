# Project 4 - Blockchains ND - Star registration notary service

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

## Endpoints - project 3 - for project reviewer, ignore these.

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

## Enpoints - project 4 - for project reviewer, test these

### POST endpoint - /requestValidation

Expects a `valid BTC` address, (checked with web3), expects the following parameters: 

```
POST URL path: http://localhost:8000/requestValidation
Content-Type: application/json
Request body: {"address":"sampleAddressHash - 1PzeKjDk2gZwyW1UJ1QHB6vRe46szektWz"}
```

Returns the following JSON message:

```
{
    "status": "Success, copy the string basdfsfsdelow to sign your block",
    "address": "sampleAddressHash - 1PzeKjDk2gZwyW1UJ1QHB6vRe46szektWz",
    "message": "1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck:1535673774:starRegistry",
    "timestamp": "1535673774",
    "validationWindow": "New star registration requests valid for another 291 seconds"
}
```

Grants the user a `5 minute authentication window`, handled by `the validation util within ../utils.js`

### POST endpoint - /message-signature/validate

Expect a `valid BTC` address, must match the `authenticated address` returned within the `/requestValidation` endpoint.

```
POST URL path: http://localhost:8000/message-signature/validate
Content-Type: application/json
Request body: {"address":"sampleAddressHash - 1PzeKjDk2gZwyW1UJ1QHB6vRe46szektWz", "signature":"signed message from Electrum, matching the message and address globally stored within the API"}
```

Returns the following JSON message:

```
{
    "registerStar": true,
     "status": {
        "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
        "requestTimeStamp": "1532296090",
        "message": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ:1532296090:starRegistry",
        "validationWindow": 193,
        "messageSignature": "valid"
    }
}
```

Validates the user's address, allows users to register a star.

### POST Endpoint - /block

Expect a `valid BTC` address, must match the `authenticated address` returned within the `/requestValidation` endpoint.

Expect:
```
- a `valid BTC` address
- must match the `authenticated address` returned within the `/requestValidation` endpoint. 
- must include a star and address property within the body
- star story must be hex encoded, can only contain ascii characters, a max length of 250 must be enforced. 
```
```
POST URL path: http://localhost:8000/block
Content-Type: application/json
Request body: {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
        "dec": "-26° 29' 24.9",  // declination
        "ra": "16h 29m 1.0s",  // right ascension
        "mag": "magniture string, optional",
        "con: "constellation string, optional"
        "star_story": "Found star using https://www.google.com/sky/"
    }
	}

Response: {
    "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
    "height": 1,
    "body": {
        "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "-26° 29' 24.9",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f" 
         }
    },
"time": "1532296234",
"previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}
```

### GET Endpoints - /stars/address/[ADDRESS] - deviating from address:[ADDRESS] route, but documenting as mentioned in previous project review.

Returns all found blocks with the provided ADDRESS.

### GET Endpoints - /stars/hash/[HASH] - deviating from hash:[HASH] route, but documenting as mentioned in previous project review.

Returns the found block with the provided HASH.

### GET Endpoints - /block/[HEIGHT]]

Returns the found block with the provided HEIGHT.

## Contribution

All files in this repository are protected under the MIT license, but feel free to contribute, fork, star, or share this application as you see fit.

For commercial or educational use, please paste a link to this repository to give proper credit.

## License

As of August 29th, 2018, these files are open for all to use and contribute to. This repository is protected under the [MIT License](http://choosealicense.com/licenses/mit/).