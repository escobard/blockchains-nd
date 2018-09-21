# Lesson 1

## Ethereum

- an open sources programmable public blockchain platform.
- includes its own scripting language, known as solidity, very similar to java
- ethereum aims to implement a world computer:
	- a global computer that is decentralized and executes peer to peer transactions, and contracts.
	- the blockchain platform and public network together are termed as the general purpose world computer.
	- not the only blockchain to attempt to do this, but it was the first and still the biggest - maybe not anymore after the recent crashes. 

### Ethereum Virtual Machine (EVM)

- Capable of executing logic, algorithms, and process data inputs.
- Turing complete: any software that is able to run code written by a developer or executed by an end user. 

### Smart Contract

- A contract written in code.
- An object on the ethereum blockchain that contains EVM code functions.
- Important to note that smart contracts are IMMUTABLE, once deployed, they exist on the network FOREVER MUAHAHHA.
- A smart contract can only dissapear if a self destruct condition is met, which is useful for iteration management.

### Solidity

- A high level language for writing and deploying smart contracts.

### Ether

- Ether is a necessary element for making the blockchain succesful
- fuel for operating the distributed application software platform 
- to run a smart contract costs ether
- a fraction of ether spent each time a contract executes

### Ethereum Roadmap

#### Frontier - 2015

- First release of the Ethereum network. This release enabled developers to experiment, mine ETH, and start building decentralized applications.

#### Homestead

- Second release of the ethereum network.
- came with many protocol improvements, and became a foundation layer for many more upgrades that followed.
- This is when ethereum classic was created.

#### Metropolis

- Third release, in 2017.
- The plan was to provide a lighter, faster and more secure client and network.
- Constantynapol, to be released in 2018.

#### Serenity

- Fourth release of the ethereum network. In this release, the long awaited transition to proof of stake (PoS) concensus algorithm is expected.

### Consencus Algorithms

- various concensous algorithms

#### Proof or Work (PoW)

- Introduced by the bitcoin network originally.
- Used by bitcoin, ether, and dogecoin networks.
- Some of the pros is that this CA works.
- But its slow, consumes a large amount of electricity and the algorythims have to create hard problems to create new blocks.
- Rewards participants who solve a cryptographic puzzle as part of the transaction validation process.

#### Proof or Authority (PoA)

- a certain few accounts shall be nominated with authority, which all nodes rely on.
- This creates a superadmin. 
- Often used in private network setups.
- Its centralized, rather than de-centralized. 

#### Proof of Stake (PoS)

- In this kind of concensus, miners are not creating blocks.
- Instead they take on the role of minters, staking their ether to vote or bet on which blocks are valid.
- Pros to this is that this is energy efficient, decentralized.
- In theory, this makes it easier to fork the network because the computing power necessary to MINT vs MINE is vastly lower for minting.
- this needs some clarification / context.
- propose a vote on new blocks, instead of solving a puzzle the validator stake or deposit ether. 
- this is the CA algorythm used by ethereum after the casper update.
- this depends on a validtors economic stake in the network, in other words how much ETHER they hold.


##### PoS types: chain based

- validators are pseudorandomly chosen, every so often after a predetermined timeslot.
- they are tasked to create a block, that points to some previous block.
- the previous block is the single longest growing chain.

##### PoS types: Byzantine fault tolerance (BFT)

- also randomly chosen and tasked to just propose a block.
- the process of agreeing on a block is done by validators, sending a vote through a multidrawn process.
- the concensus can ocurr within one block, the previous block is not limited by the length and size of the chain.

##### PoS benefits:

- Does not require a lot of electricity.
- This allows for the potential super expansion of the ethereum network, as it relies on far less electricity and processing power to operate.
- Can allow costs to be reduced drastically between transactions, enabling potentially negative return to the network, further improving the value of the token.
- Potentially discourages selfish miners, this makes it so that mines can potentially be selfish.
- Rewards are not exponential to economies of scale
	- centralized miners (sheemuhn) benefited from PoW and the economies of scale.
	- ie. if they had 10 million, the returns would be 10 times higher higher than 1 million, as they can afford to secure a vast majority of better hardware.
- less chances of a 51% attack, as there are economic penalties.
	- the majority of the power used for mining is owned by a single malicious entity. 
	- once they have control, they are able to take over the network and limit the ability of the blocks in the chain
	- in proof of stake, this is impossible since even if someone were to own the majority of a network it would be in their best interest to take actions that benefit the protocol as a whole. 