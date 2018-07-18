## Bitcoin Core - Overview

### Bitcoin Network
	- Network of bitcoin users creating and validating transactions.
	- Different from a the bitcoin core, which handles the software development of applications

### Bitcoin Core 
	- Implementation of bitcoin that encompasses all of the software behind bitcoin.
	- This is where the libraries that fuel bitcoin applications comes from.

#### Bitcoin transaction verification engine
	- allowing you to verify transactions happening on the bitgoin network.

#### Explore and validate the entire bitcoin blockchain

### Debug Console
	- tool that allows you to interact with data on the bitcoin blockchain (similar to ethereum's remix: https://remix.ethereum.org/)

## Bitcoin Core - Networks

	- will be using 3 networks to build applications with this course for bitcoin

### Mainnet
	- primary bitcoin transactions take place on this network
	- live transactions, has value and contains peers, slowest network
	- vs Testnet:
		- Purpose - Production
		- Environment - Public
		- Peers - Entire network
		- Size - 200GB
		- Block creation - 10 minutes
		- Value - Full Value
		- Public key prefix: 1
		- Block difficulty - Full - Self adjusted dependent of block creation net

### Testnet
	- for testing, no value, has peers
	- alternative bitcoin blockchain which helps the testing of applications
	- creating new blocks, and validating new blockchains takes time - slows down the network
	- People have hoarded test coins:
		- it makes it more difficult for developers to continue testing with the network.
		- Because of this, developers have started from scratch to wipe the network 
	- vs Mainnet:
		- Purpose - testing
		- Environment - Public
		- Peers - Active testers
		- Size - 14GB
		- Block creation - 10 minutes
		- Value - No value
		- public key prefix: **m** or **n**
		- block difficulty - Half of mainnet, takes less computing power
	- vs Regnet:
		- Purpose - testing
		- Environment - Public
		- Peers - Active testers
		- Size - 14GB
		- Block creation - 10 minutes
		- Value - No value
		- public key prefix: **m** or **n**
		- block difficulty - Half of mainnet, takes less computing power

### Regnet - Regression Test Mode Network
	- for testing, no value, no peers
	- not on a network, takes almost no time
	vs Regnet
		- Purpose - testing
		- Environment - Private, completely local to your own computer
		- Peers - No peers
		- Size - 0GB
		- Block creation - instantly, since there is no block validation
		- Value - No value
		- public key prefix: **m** or **n**
		- block difficulty - no difficulty

## Bitcoin Core - Wallet
	- Fully validates transactions and blocks.
	- By downloading the bitcoin core waller, we create a node which interacts with the bitcoin network.
	- Multiple options are available, but we are using bitcoin core for our purposes.
	- very similar to other wallet interfaces, no need to expand.

## Bitcoin Core - Networks
	- all can be accessed using the bitcoin core client
	- to connect to other networks, we can use the bitcoin.conf file.
		- to connect to any network, type the network name, equal sign, and a 1 like so:
			- `testnet=1`
			- any of these can be commented out by using the # pretext like so:
			- `#testnet=1`
		- the bitcoin core client must be shut down in order for this to work.
		- accessing the regnet is exactly the same as with bitcoin

## Bitcoin core - test network coin faucet
	- faucets come and go, but we can find current faucets for testnet here: https://testnet.manu.backend.hamburg/faucet
	- copy your address into the input to get coins

## Bitcoin core - transactions
	- refer to 