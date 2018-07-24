# Lesson 4

## Blockchain Data Models

### Block Header
	- containes the following:
		- Previous Block’s Hash - The hash value for the block that comes directly before a given block in the chain. This is what links blocks in the blockchain together
		- Time - The time the block was created is also held in the header
		- Merkle Root - The merkle root is a hash that represents every transaction included inside the block. To get the merkle root, pairs of transactions within a block are repeatedly hashed together. Each pair results in a single hash. Then the hash of 2 pairs of transactions are again hashed together, over and over again until you are left with a single hash value. Given that final hash value, known as the merkle root, you can now reverse the hashing to reconstruct the entire set of transactions from the original block.
		- Nonce - A nonce (stands for “number only used once") is a number used in bitcoin mining. The blockchain miners are solving for the nonce what when added to a hashed block, and those 2 values are rehashed, will solve the mining puzzle.

### Block Body
	- contains all transactions accepted / signed by the proof of work algorythm (mining)

## Transaction data models