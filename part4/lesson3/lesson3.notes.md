# Lesson 3

## Smart Contracts

- Programs that can be ran on the Ethereum network.
- Each call to a smart contract is verified by all notes participating in the smart contract.
- This idea of a smart contract was proposed initially by Nick Szabo in 1996.
- Ethereum is the first blockchain to implement the idea of a smart contract.
- 

### Vs bitcoin script

- Turing complete:
	- smart contract code can have non-deterministic conditional branching, jumps, and for loops.
	- in other words, calling a computer Turing complete means that it can execute any algorithm
		- https://simple.wikipedia.org/wiki/Turing_complete

### ICO

- projects that raised billions of dollars, offered different types of ethereum services.
- these programs have ranged from games, to providing services, to art, insurance, loans, derivitives, and even keeping track of physical property.
- Today there are over 1000 such projects that have made their own token on top of ethereum, with smart contracts.
- A prime example of a great ICO is crypto kitties.

### CryptoKitties

- breed and raise digital cats, buy with ether.
- https://www.cryptokitties.co/
- can go as low as a few dollars, to the highest recorded sell being $140,000.
	- https://www.nytimes.com/2018/05/18/style/cryptokitty-auction.html
- depends on the rarity of the cat, breed, etc.

### Solidity

- mostly compared to javascript and c++
- https://solidity.readthedocs.io/en/v0.4.24/units-and-global-variables.html?highlight=msg.sender

### Remix

- To save time, refer to udemy repo for solidity and remix syntax basics

### CryptoPunks

- https://www.larvalabs.com/cryptopunks
- cool application that has unique characters with proof of ownership stored on the ethereum blockchain.

### Etherscan

- We can view more information about users, by grabbing the users address.
- https://etherscan.io/address/0xc352b534e8b987e036a93539fd6897f53488e56a#tokentxns
- allows us to see transactions, values, tokens purchased.
- is great for general information of an account, but does not allow great information of which token the account wallet holds.

### Rarebits

- Allows for browsing of crypto tokens / assets in any given account.
- https://rarebits.io/address/0xC352B534e8b987e036A93539Fd6897F53488e56a

### Ethereum and private networks

- As a brief reminder, public and private chains are structurally very similar.
- Primary difference is private chains do not grand access to just anyone, only to verified users.
- Having a private version of the the ethereum blockchain, means that it cannot be part of the main public blockchain.
- Some developers are creating private ethereum networks, such a quorum: https://www.jpmorgan.com/global/Quorum
- Private blockchains have entirely different use cases, to allow ethereum like capabilities, with authentication and restrictive capabilities.
	- This allows for SECURE access to sensitive data.
	- The applications are fairly diverse, but the main underlying point is that only trusted nodes can participate and operate on the sensitive data within the private blockchains.


### Ganache

- local (therefore private) ethereum protocol, for local testing of the ethereum protocol.
- https://truffleframework.com/ganache
- downloaded interface, and the CLI.
- cli can be initated with:
	`ganache-cli`
	- initates a private ether network, with 9 accounts, each with 100 ether.
- can connect to this network via the remix client from:
	- Run > web3 provider> enter ganache local port
- Deploying the contract onto the ganache network will display the transaction information, within its corresponding block.

## Smart Contracts

- Programs that can be ran on the Ethereum network.
- Each call to a smart contract is verified by all notes participating in the smart contract.
- This idea of a smart contract was proposed initially by Nick Szabo in 1996.
- Ethereum is the first blockchain to implement the idea of a smart contract.
- 

### Vs bitcoin script

- Turing complete:
	- smart contract code can have non-deterministic conditional branching, jumps, and for loops.
	- in other words, calling a computer Turing complete means that it can execute any algorithm
		- https://simple.wikipedia.org/wiki/Turing_complete

### ICO

- projects that raised billions of dollars, offered different types of ethereum services.
- these programs have ranged from games, to providing services, to art, insurance, loans, derivitives, and even keeping track of physical property.
- Today there are over 1000 such projects that have made their own token on top of ethereum, with smart contracts.
- A prime example of a great ICO is crypto kitties.

### CryptoKitties

- breed and raise digital cats, buy with ether.
- https://www.cryptokitties.co/
- can go as low as a few dollars, to the highest recorded sell being $140,000.
	- https://www.nytimes.com/2018/05/18/style/cryptokitty-auction.html
- depends on the rarity of the cat, breed, etc.

### Solidity

- mostly compared to javascript and c++

### Remix

- When deployed, click on the details button.
	- this displays all relevant information about the smart contract.
	- The ABI tab (ABI is the compiled interface code for JS to use) we can see every function in the contract, and their purpose.
	
### Truffle

- https://truffleframework.com/
- makes testing smart contracts w/ js easier (apparently)

## EIPS

- https://eips.ethereum.org/
- Standards for forking and creating our own tokens off the ethereum network