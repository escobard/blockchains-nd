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


### Accounts

- These are known as objects.
- Represents an identity used by people, mining nodes, or contracts.

#### Externally owned accounts (EOA's)

- Managed by individuals who own a private key (actual user)
	- contains the transaction count - how many transactions have taken place on the account.
	- and the account balance.
- Send transactions, initiate a smart contract, transfer value from a wallet to another account.

#### Contract accounts (CA's)

- Contract accounts are accounts controlled by the code within a smart contract.
	- Contains:
		- Account balance - can transfer other value, and initiate a smart contract.
			- When receiving transactions, a CA has the ability to execute associated smart contracts, and in some cases manipulate storage. 
		- Transaction count - in this case it tracks the times it has deployed other smart contracts.
		- Smart contract code. 
- Contract accounts can be created by another CA account or an EOA.
- Executes code when triggered by transactions or messages.

### Account Properties

#### Nonce

- Number of transactions on the account. 
	- EOA: Number of transactions sent from this accounts address.
	- CA: Number of contracts created by the account.

#### Account Balance

- Total value of ether in the account.
- This is shown in wei, smaller denomination of ether.
	- 1 ether is 10^18 wey

#### Storage Hash

- Root node of the patricia tree.
- This hash contains the contents of the account.

#### Code Hash

- Hash of the code within the smart contract.
- This is the code that is executed every time a call is made to the contract.
	- Specific to CA accounts only.
	- this cannot be changed, enforces smart contract immutability.

### Transaction Types

- Can only be initiated by an externally owned account (maybe not for contract creation)
- Can be between a person to another person or a person to a contract.

#### Message Calls

- Can be used to send a message to EOA or CA accounts.
- Each transaction must be signed with the user's private key.

#### Contract Creation

- Creates a contract on the ethereum network.

### Transaction properties

#### Nonce

- Transaction count
- iterating number based on how many transactions the account has

#### Gas Price

- This is the price the sender is willing to pay this fee per computational step.
- This is not the total gas utilized to computate the application, rather the PRICE your are willing to pay miners per computational step.
- Essentially the higher the gas price, the faster your transaction will be signed / added to a block.
	- Its important to find a balance the gas price for the contract. 

#### Gas Limit

- Specifies the max number of computation steps the transaction is allowed.
	- Tells the network the maximum amount of gas you are willing to pay.
	- This theoretically allows for quicker miner / signing of transactions.
- Maximum amount of gas a sender is willing to pay for a given transaction.
	- The sender will not pay more than this amount for each given transaction.
	- Can be thought of as a spending budget.
		- Prevents extreme transaction costs from infinite loops, as an extreme example.
	- if you don't specify enough gas to run your code, you will get an error.
		- in these cases you will spend the gas, and output nothing useful for the code.
		- its usually best to specify a higher than necessary gas limit, to minimize such errors.

#### To

- The recipient's address.

#### Value

- Amount we are sending for the transaction.

#### Data, init

- Handles the information used to manage smart contracts.

### Gas

- Lifecycle of an ethereum transactionis not much different from ether.
	- Gas is the eqivalent of miner fees with bitcoin, in a basic sense.
- Is the count for the cost of doing the transaction in the first place.
	- The total sum of these fees, is converted to its equivalent value in ether at the end of the transaction.
	- Think of this as actual gas in a car.
		- You require a certain amount of gas (which holds its own value) to fill up the tank.
		- Gas holds its own value, so the total cost of the gas is the sum of the value of each gallon you buy.
		- The total cost is then paid to a casheer, ending the transaction.
	- In Ether:
		- A certain amount of gas is necessary to execute a contract.
			- this ranges widely based on the type of operation executed in the contract.
		- Total value of contract execution is summed, as an ether value.
		- The total ether cost of the contract execution, is then paid to the miner for signing the block.