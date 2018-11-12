# Project 4 - Blockchains ND - Star registration notary service

## Project Criteria

The main purpose of this application is to meet the project criteria for the third project of the Blockchains Nanodegree by Udacity.

1. web API post endpoints validates request with JSON response
    1. Response should contain message details, request timestamp, and time remaining for validation window.
    1. User obtains a response in JSON format with a message to sign.
    1. Message format = [walletAddress]:[timeStamp]:starRegistry
    1. The request must be configured with a limited validation window of five minutes.
    1. When re-submitting within validation window, validation window should reduce until it expires.
    1. URL: http://localhost:8000/requestValidation
1. Web API post endpoint validates message signature with JSON response.
   Resources
   1. Web API post endpoint validates message signature with JSON response.
   1. Upon validation, the user is granted access to register a single star.
      URL: http://localhost:8000/message-signature/validate
1. Web API Post Endpoint with JSON response.
   Resources
   1. Star object and properties are stored within the body of the block.
   1. Star properties include the coordinates with encoded story.
   1. Star story supports ASCII text, limited to 250 words (500 bytes), and hex encoded.
      URL: http://localhost:8000/block
1. Get star block by hash with JSON response.
   Resources
   1. Response includes entire star block contents along with the addition of star story decoded to ascii.
   1. URL: http://localhost:8000/stars/hash/[HASH]
1. Get star block by wallet address (blockchain identity) with JSON response.
   Resources
   1. Response includes entire star block contents along with the addition of star story decoded to ascii.
   1. Multiple stars might be registered to a single blockchain identity.
   1. The response should support multiple star blocks.
   1. URL: http://localhost:8000/stars/address/[ADDRESS]
1. Get star block by star block height with JSON response.
   Resources
   1. Response includes entire star block contents along with the addition of star story decoded to ascii.
   1. URL: http://localhost:8000/block/[HEIGHT]
   
   
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

```angular2html
{
    blockchain: {
        chain: [
            {
                hash: "050a5ed6c537bbf8f63cff1c297617aad9f7f8b12d6b4c2f41a38371cc36ba80",
                height: 0,
                body: "Genesis block - First block in the chain",
                time: "1541637545",
                previousblockhash: ""
            },
            {
                hash: "3d344d97bf037d045a8dcd46ed659e54d1f7160625ca0a8690e44ad6f4254eff",
                height: 1,
                body: {
                    address: "19xSGYkKgStMzqPthuJ4VW7C3XS2SUYTkE",
                    star: {
                        dec: "-26° 29' 24.9",
                        ra: "16h 29m 1.0s",
                        mag: "magniture string, optional",
                        con: "constellation string, optional",
                        star_story: "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
                    }
                },
                time: "1541718988",
                previousblockhash: "050a5ed6c537bbf8f63cff1c297617aad9f7f8b12d6b4c2f41a38371cc36ba80"
            }
        ],
            height: 2
    }
}
```

### GET Endpoint - /health

Returns a simple JSON response, tests API health

```angular2html
{
    healthy: true
}
```

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

### GET Endpoints - /stars/address/[ADDRESS]

Returns all found blocks with the provided ADDRESS.

```angular2html
{
    "address": "19xSGYkKgStMzqPthuJ4VW7C3XS2SUYTkE",
    "blocks": [
        {
            "hash": "3d344d97bf037d045a8dcd46ed659e54d1f7160625ca0a8690e44ad6f4254eff",
            "height": 1,
            "body": {
                "address": "19xSGYkKgStMzqPthuJ4VW7C3XS2SUYTkE",
                "star": {
                    "dec": "-26° 29' 24.9",
                    "ra": "16h 29m 1.0s",
                    "mag": "magniture string, optional",
                    "con": "constellation string, optional",
                    "star_story": "Found star using https://www.google.com/sky/"
                }
            },
            "time": "1541718988",
            "previousblockhash": "050a5ed6c537bbf8f63cff1c297617aad9f7f8b12d6b4c2f41a38371cc36ba80"
        }
    ]
}
```

### GET Endpoints - /stars/hash/[HASH]

Returns the found block with the provided HASH.

```angular2html
{
    "hash": "3d344d97bf037d045a8dcd46ed659e54d1f7160625ca0a8690e44ad6f4254eff",
    "blocks": [
        {
            "hash": "3d344d97bf037d045a8dcd46ed659e54d1f7160625ca0a8690e44ad6f4254eff",
            "height": 1,
            "body": {
                "address": "19xSGYkKgStMzqPthuJ4VW7C3XS2SUYTkE",
                "star": {
                    "dec": "-26° 29' 24.9",
                    "ra": "16h 29m 1.0s",
                    "mag": "magniture string, optional",
                    "con": "constellation string, optional",
                    "star_story": "\u000f\u0000\r\u0000\n\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u000e\f\u0000\u0000\u0000"
                }
            },
            "time": "1541718988",
            "previousblockhash": "050a5ed6c537bbf8f63cff1c297617aad9f7f8b12d6b4c2f41a38371cc36ba80"
        }
    ]
}
```

### GET Endpoints - /block/[HEIGHT]]

Returns the found block with the provided HEIGHT.

```angular2html
{
    "blockHeightParams": "Height: 1",
    "block": [
        {
            "hash": "3d344d97bf037d045a8dcd46ed659e54d1f7160625ca0a8690e44ad6f4254eff",
            "height": 1,
            "body": {
                "address": "19xSGYkKgStMzqPthuJ4VW7C3XS2SUYTkE",
                "star": {
                    "dec": "-26° 29' 24.9",
                    "ra": "16h 29m 1.0s",
                    "mag": "magniture string, optional",
                    "con": "constellation string, optional",
                    "star_story": "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
                }
            },
            "time": "1541718988",
            "previousblockhash": "050a5ed6c537bbf8f63cff1c297617aad9f7f8b12d6b4c2f41a38371cc36ba80"
        }
    ]
}
```

## Libraries & Frameworks

[Node](https://nodejs.org/en/)

[Express](https://expressjs.com/)

[Level](http://leveldb.org/)

[Bitcoin](https://bitcoin.org/en/)

## Contribution

All files in this repository are protected under the MIT license, but feel free to contribute, fork, star, or share this application as you see fit.

For commercial or educational use, please paste a link to this repository to give proper credit.

## License

As of November 11th, 2018, 2018, these files are open for all to use and contribute to. This repository is protected under the [MIT License](http://choosealicense.com/licenses/mit/).