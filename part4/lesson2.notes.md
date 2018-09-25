# Lesson 2

### Ethereum

- Decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud, or third-party interference. - Official definition from ethereum.org
- Generalized platform that allowed users to DEVELOP ontop of it.
	- this is the previously mentioned 'world computer', and ethereums primary mission.
- Think of the ethereum network as an operating system.
	- ie, an operating system gives you the tools and resources necessary to build ontop of them.

### Bitcoin Vs Ethereum

#### Bitcoin.
	- Permission restrictions: permissionless, anyone that wants to gain access or creates blocks can do so.
	- Concensus: Proof of work.
	- Scalability: High node scalability, low performance scalability - struggles to scale its performance.
		- bitcoin transactions take 10 ish minutes
	- Regulation: Low, decentralized decision making by community.
	- Anonymity: Pseudonymity - identity is tied to a users private key.
	- Scripting: Limited possibilities

#### Ethereum
	- Permission restrictions: permissionless, anyone that wants to gain access or creates blocks can do so.
	- Concensus: Proof of work, casper will introduce proof of stake concept TBD.
	- Scalability: High node scalability, low performance scalability - struggles to scale its performance.
		- ethereum takes 15 seconds
		- this may seem huge, but compared to visa and mastercard which process 5000 transactions a second, this is a huge setback 
	- Regulation: Medium, core developer group.
	- Anonymity: Pseudonymity - identity is tied to a users private key.
	- Scripting: Turing complete virtual machine 

### Blockchain "State"

- How it manages information within its data storage layer.
	- ei, transactions, keys, and other important information.


#### Bitcoin
- In Bitcoin, the "State" is represented by transaction outputs, or UTXO's.
	- The account balance of a user is the sum total of the unspent transaction outputs, owned by the user's private key.
	- Differes from Ethereum, which holds an actual balance for the account.

#### Ethereum
- In Ethereum, the "State" is the 'world state', and is not limited to managing the following (expanded upon later):
	- Nonce
	- Balance
	- Storage hash
	- Code hash
	- Account storage
	- EVM
	- Account state is held separately from the blockchain.
		- Removed from the blockchain, but contains information about the state of the blockchain.
		- This can be thought as the following.
			- NETWORK:
				- Ledger: Contains the actual blocks, transactions.
				- Account: Contains accounts, addresses, balances.
					- This information is mapped into the blockchain, from the account collection.
					- Possible due to something known as a 'patricia tree'
						- https://github.com/ethereum/wiki/wiki/Patricia-Tree
						- the main benefit of this structure is related to storage.
						- allows ethereum to store values in a way that extends the state outside of the ledger.


