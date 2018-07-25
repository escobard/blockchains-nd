# Lesson 4

## Blockchain Data Models - lecture 3

### Block Header
	- containes the following:
		- Previous Block’s Hash - The hash value for the block that comes directly before a given block in the chain. This is what links blocks in the blockchain together
		- Time - The time the block was created is also held in the header
		- Merkle Root - The merkle root is a hash that represents every transaction included inside the block. To get the merkle root, pairs of transactions within a block are repeatedly hashed together. Each pair results in a single hash. Then the hash of 2 pairs of transactions are again hashed together, over and over again until you are left with a single hash value. Given that final hash value, known as the merkle root, you can now reverse the hashing to reconstruct the entire set of transactions from the original block.
		- Nonce - A nonce (stands for “number only used once") is a number used in bitcoin mining. The blockchain miners are solving for the nonce what when added to a hashed block, and those 2 values are rehashed, will solve the mining puzzle.

### Block Body
	- contains all transactions accepted / signed by the proof of work algorythm (mining)

## Transaction data models - lecture 4
	- this area is super confusing, will have to review.
	- a data structure taht encodes a transfer of value from a source of funds called an input to a destination called an output - not too clear, will review later
	- input: An input is a reference to an output from a previous transaction. Multiple inputs are often listed in a transaction. All of the new transaction's input values (that is, the total coin value of the previous outputs referenced by the new transaction's inputs) are added up, and the total (less any transaction fee) is completely used by the outputs of the new transaction. Previous tx is a hash of a previous transaction. Index is the specific output in the referenced transaction. ScriptSig is the first half of a script.

	The script contains two components, a signature and a public key. The public key must match the hash given in the script of the redeemed output. The public key is used to verify the redeemers signature, which is the second component. More precisely, the second component is an ECDSA signature over a hash of a simplified version of the transaction. It, combined with the public key, proves the transaction was created by the real owner of the address in question. Various flags define how the transaction is simplified and can be used to create different types of payment.
	- output: An output contains instructions for sending bitcoins. Value is the number of Satoshi (1 BTC = 100,000,000 Satoshi) that this output will be worth when claimed. ScriptPubKey is the second half of a script (discussed later). There can be more than one output, and they share the combined value of the inputs. Because each output from one transaction can only ever be referenced once by an input of a subsequent transaction, the entire combined input value needs to be sent in an output if you don't want to lose it. If the input is worth 50 BTC but you only want to send 25 BTC, Bitcoin will create two outputs worth 25 BTC: one to the destination, and one back to you (known as "change", though you send it to yourself). Any input bitcoins not redeemed in an output is considered a transaction fee; whoever generates the block can claim it by inserting it into the coinbase transaction of that block.
	- outputs hashes are shortened to UTXO - these contain the signed hashes from a block 
	- transaction fees = sum(inputs) - sum(outputs)
	- Raw transactions: transactions that are still in a hexidecimal format, and have not been decrypted
	- Refer to images/part2.lesson4.lecture.3.transaction.data.model.png for more details on the data model. Super important to understand hashing protocols when building our own blockchains
	- version: include information about the version of bitcoin used, to know which rules our transaction follows.
	- input count: how many inputs were used up for this transaction.
	- input info (script): where the input is coming from, and checks of the inputs that can be used
	- output count: how many outputs were produced from this transaction.
	- output info (script): where the input is coming from, how much was outputted and any conditions for future transactions
	- locktime: earliest time or the earliest brock a transaction can use to be added to the blockchain. if this is a number that is less than 500,000,000 it will be represented as a block height.

### Transaction scripts

	- these are scripts within the transaction, which are instrumental in deciding how the transaction gets signed.
	- transaction input scripts contain unlocking algorythms 
	- transaction output contains a locking algorythm
	- if a transaction is valid, this means that the unlocking scrypt has respected the rules within the locking script

## Bitcoin Scripts - lecture 5
	- script: a list of instructions recorded in each transaction that when executed determines if the transaction is valid and the bitcoins can be spent.
	- Script: also refers to the language used to handle bitcoin transactions, called script. 
		- A simple lightweight language designed to be limited in scope and executable on a range of hardware.
		- stack based language - the data is stored in a simple data structure that looks like a stack.
		- stores numbers (data constants)
		- uses opcodes (short for operation codes) to add, remove, access, a stack.
		- execute from left to right.
	- bitcoin clients validate transactions by executing unlocking and locking scripts together.
		- Goes like this:
		- each transaction's input (sender) has an unlocking script, which reaches out to the locking script's (receiver's) UTXO (bitcoin value) and locks the value. 
		- the validation algyo takes the unlocking script container in the input, grabs the referencing UTXO (receiver's output) and references the two together to validate the transaction.
		- Its important to note that the UNLOCKING script (from a transction's input) does not interact in any way with the next transaction. Instead, it UNLOCKS the OUTPUT (utxo) of the PREVIOUS transaction, validating the transaction of the SENDER, and LOCKING the RECEIVER's UTXO after.
		- expanded description of input / output info in images/part2.lesson4.lecture.5.transaction.expanded.model.png

### Bitcoin Scripts - Unlocking
	- unlocking script - like a puzzle that sets rules that MUST be met to be validated before a transaction can ocur.
		- these are unlocked with both the SIGNATURE and the PUBLIC KEY
	- this is the solution necessary to satisfy the conditions of the locking script, and allows the output to be spent.
	- scriptSig: contains the script to unlock, and sign an OUTPUT so it can be spent

### Bitcoin Scripts - Locking
	- this output is payable to whoever can present a signature from they key corresponding to the RECEIVER's public address.
	- this means that the RECEIVER must provide the solution to the UNLOCKING script (pub key + sig) to VALIDATE the transaction, before it hits an OUTPUT (locking script) from the SENDER.
	- this means that only brandy's wallet has the signature to redeem the output's value, meaning only brandy can send the output to a receiver's input.
	- scriptPubKey: public script to decrypt a user's public key.
