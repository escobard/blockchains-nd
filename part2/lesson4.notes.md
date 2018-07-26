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
	- locktime - The locktime field indicates the earliest time or the earliest block a transaction can be added to the blockchain. If the locktime is non-zero and less than 500 million, it is interpreted as a block height and miners have to wait until that block height is reached before attempting to add it to a block. If the locktime is above 500 million, it is read as a unix timestamp which means the number of seconds since the date January 1st 1970. It is usually 0 which means confirm as soon as possible.

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

## Bitcoin Scripts - lecture 6-7

### Notations - input:
	- input scripts and output script compiled files usually output the hex hashes (encrypted) to the public.
	- input scripts generically look like this in the actual code <sig> <pubKey>
	- input scripts output as the following: 
	ScriptSig: PUSHDATA(71)[304402206f32f62c2ee00b9d6aaa07a0665cc76a9b840be475573aecbf982b2018397c2d0220510729285e0b061e78a899245f5069b50ba076a24f7b9aa581d8a344fb0fcb5301] PUSHDATA(33)[03416fe9ba17be8fe3f88011923135e83c6a0666fcb575de6ab337c7d6c8f41a5f]

### Notations - output
	- output scripts focus on the locking scripts.
	- output scripts generally look like tis in the actual code: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
	- output scripts compile to the following: DUP HASH160 PUSHDATA(20)[07628bb59790a53711f3e9caddaa7eed89663935] EQUALVERIFY CHECKSIG
	- more on these later

### Notations - common commands:
	- From the course material - mega confusing atm
	- Which Unlocking Script (scriptSig) will satisfy this Locking Script (scriptPubKey)?
	- Locking Script: OP_ADD 2 OP_MUL 1 OP_ADD 11 OP_EQUAL
		•	OP_ADD adds the top two inputs from the stack of it and returns the result to the stack. Let's call this combine result n. From the bottom of the stack up is now n
		•	Next, 2 is added to the stack. From the bottom up, the stack now is n 2.
		•	OP_MUL multiplies the top 2 inputs from the stack and returns the result to the top of the stack. So 2*n is returned to the top of the stack. From the bottom of the stack, is now 2*n
		•	1 is added to the top of the stack. From the bottom up, the stack now is 2*n 1
		•	OP_ADD adds the top two inputs from the top of the stack and pushes the result back to the top. Add 2n + 1 and push back result onto the stack. From the bottom up, the stack has two values now - `2n+1`.
		•	11 is added to the top of the stack. From the bottom up, the stack now is a 2*n+1 11.
		•	OP_EQUAL compares the top 2 values from the stack and returns True if they are equal and False if they are not equal. 2n+1 and 11 are the top 2 values. They need to equal each other for the Unlocking Script to solve the Locking Script, so if we solve for n to satisfy 2n+1 = 1, n = 5.
		•	Of all the answer choices, only 2 3 combines to equal 5.

### Attributes of Scripts:
	- Not turing complete:
		- no loops or complex flow control
		- completely deterministic - we know when the code starts and ends
		- provides simplicity and security
		- prevents the transactions from being hacked into, due to its simplistic nature
	- Stateless Verification
		- all information needed to complete the script are container within the script
		- no state saved prior to running the script or after the script executes
		- script is self-container, will run the same way anywhere in the system
		- provides predictable behavior no matter where the script is executed

## Raw transaction Review - lecture 8-9
	- transaction stored in the bitcoin blockchain are stored in a double-hashed form.
	- this means that raw transactions are put through the SHA256 (hashing algyorythm) twice to get the transaction hash we see on the block chain.
	- SHA256(SHA256(Raw Transaction)) = Transaction hash
	- For example, a transaction with this hash: b138360800cdc72248c3ca8dfd06de85913d1aac7f41b4fa54eb1f5a4a379081
	- Transaction in the bitcoin blockchain are stored in a double-hashed form: SHA256(SHA256(01000…) = b138360800cdc72248c3ca8dfd06de85913d1aac7f41b4fa54eb1f5a4a379081
	- Raw transactions are created using the Recursive length prefix algorythm.
	- More on that here: https://github.com/ethereum/wiki/wiki/RLP

### Input info - breakdown
	- this contains a bit more information that was previously revealed.
	- Previous output hash - All inputs reference back to an output (UTXO). This points back to the transaction containing the UTXO that will be spend in this input. The hash value of this UTXO is saved in a reverse ordered here.*
	- Previous output index - A transaction may have more than one UTXO which are referenced by their index number. The first index is 0.
	- Unlocking Script Size - This is the size of the Unlocking Script in bytes.
	- Unlocking Script - This is the hash of the Unlocking Script that fulfills the conditions of the UTXO Locking Script.
	- Sequence Number - This s a deprecated feature of bitcoin Currently set to ffffffff by default.
	- refer to part2/images/part2.lesson4.lecture.8.inputinfo.expanded.model.png

### Output info - breakdown
	- also contains a bit more than previously established:
	- Amount - The amount of Bitcoin outputted in Satoshis (the smallest bitcoin unit). 10^8 Satoshis = 1 Bitcoin.
	- Locking Script Size - This is the size of the Locking Script in bytes.
	- Locking Script - This is the hash of the Locking Script that specifies the conditions that must be met to spend this output.
	- refer to part2/images/part2.lesson4.lecture.8.outputinfo.expanded.model.png

## Raw transaction notes:
	- listunspent: show all the unspent confirmed outputs in our wallet. These can be used as inputs in another transaction.
	- lists all UTXO's which can be spent for other transactions, in an array liek this one:
	```
	[
	  {
	    "txid": "b55cd4dd01e387f1370f07eb404d3f1c5c5843a4e382d0194eb486f9db064cb4",
	    "vout": 0,
	    "address": "2NFpW9Hy9vMb5auMvbWhURVPQBR5RMpZutV",
	    "redeemScript": "0014230c1344acdac1afcbc2c8bb9f8d36dee8a2aab5",
	    "scriptPubKey": "a914f79dfad2a231bf0605147720c8bdc82939f53ff987",
	    "amount": 1.09998780,
	    "confirmations": 1255,
	    "spendable": true,
	    "solvable": true,
	    "safe": true
	  },
	  {
	    "txid": "b55cd4dd01e387f1370f07eb404d3f1c5c5843a4e382d0194eb486f9db064cb4",
	    "vout": 1,
	    "address": "2N8EAh68kLLFohbghbpYgF9kkp12QAbztUm",
	    "account": "public faucet test",
	    "redeemScript": "0014f81e100c1e25256666af1981576a83548f47e911",
	    "scriptPubKey": "a914a456b8139f80d472a2f2a3f80e9516a270d885ae87",
	    "amount": 0.00001000,
	    "confirmations": 1255,
	    "spendable": true,
	    "solvable": true,
	    "safe": true
	  },
	  {
	    "txid": "c8dbc035617bd4e1fb662086319265a685cd13df13c315b1c4cab96171d30ade",
	    "vout": 0,
	    "address": "2NA3aX95DYrHNhmth28nvkgGu2TJHV5gPDF",
	    "redeemScript": "00149bf6cf09dcfc7365d2c66109072723bf292fba9e",
	    "scriptPubKey": "a914b846493984eb7e4c9b4fe5b77139cf62cebba32387",
	    "amount": 0.54989780,
	    "confirmations": 1255,
	    "spendable": true,
	    "solvable": true,
	    "safe": true
	  },
	  {
	    "txid": "c8dbc035617bd4e1fb662086319265a685cd13df13c315b1c4cab96171d30ade",
	    "vout": 1,
	    "address": "2N8EAh68kLLFohbghbpYgF9kkp12QAbztUm",
	    "account": "public faucet test",
	    "redeemScript": "0014f81e100c1e25256666af1981576a83548f47e911",
	    "scriptPubKey": "a914a456b8139f80d472a2f2a3f80e9516a270d885ae87",
	    "amount": 0.00010000,
	    "confirmations": 1255,
	    "spendable": true,
	    "solvable": true,
	    "safe": true
	  }
	]
	```
	•	txid - This shows us that there is a Transaction with this id.
	•	vout - The Transaction has one output (vout at index 0).
	•	address - The Transaction is assigned to this address.
	•	account - This is a deprecated. It’s set to “ “ as a default.
	•	scriptPubKey - The hash of the Locking Script
	•	amount - Transaction amount in BTC
	•	confirmations - At the time of viewing this Tx, it has been confirmed 7 times (6 blocks added after it was added to the blockchain).
	- gettxout - command to get the details of the unspent output we found.
	- full command: `gettxout "txid" n ( include_mempool )`
	- arguments:
		```
		•	"txid" (string, required) The transaction id
		•	"n" (numeric, required) vout number
		•	"include_mempool" (boolean, optional) Whether to include the mempool. Default: true. Note that an unspent output that is spent in the mempool won't appear.
		```
	- used command gettxout c8dbc035617bd4e1fb662086319265a685cd13df13c315b1c4cab96171d30ade 0
	- output:
	```
	{
	  "bestblock": "000000000000000382d3554a5af16a49848659174a602dfb588dbbfeb326bf7c",
	  "confirmations": 1255,
	  "value": 0.54989780,
	  "scriptPubKey": {
	    "asm": "OP_HASH160 b846493984eb7e4c9b4fe5b77139cf62cebba323 OP_EQUAL",
	    "hex": "a914b846493984eb7e4c9b4fe5b77139cf62cebba32387",
	    "reqSigs": 1,
	    "type": "scripthash",
	    "addresses": [
	      "2NA3aX95DYrHNhmth28nvkgGu2TJHV5gPDF"
	    ]
	  },
	  "coinbase": false
	}
	```

### Create Raw Transaction:
	- We found a transaction with 0.55 btc
	- Sum(Inputs) - Sum(Outputs) = Transaction Fee
	- To calculate the cost the following must happen (not 100% sure yet):
		- If we have 0.55 btc, and want to send 0.30, the remaining difference is 0.25.
		- We want to pay 0.0005 btc as the transaction price.
		- to calculate the total output we do the following:
		- for OUTPUT calculations, using the remaining amount and the desired cost: (0.025 - 0.0005 BTC) = 0.0245 (this is the remaining amount within the output )
	- Now we calculate the transaction fee:
		- (0.055 BTC - the amount we currently have to spend in the input) - (0.030 + 0.0245 - the amount we are sending + the remaining amount after transaction price - these are both considered as outputs) = 0.0005 BTC (transaction fee)
	- the raw transaction amount is as follows:
	- createrawtransaction [{"txid":"id","vout":n},...] {"address":amount,"data":"hex",...} ( locktime ) ( replaceable )
	- Argument breakdown:
		```
		1. "inputs"                (array, required) A json array of json objects
		     [
		       {
		         "txid":"id",    (string, required) The transaction id
		         "vout":n,         (numeric, required) The output number
		         "sequence":n      (numeric, optional) The sequence number
		       } 
		       ,...
		     ]
		2. "outputs"               (object, required) a json object with outputs
		    {
		      "address": x.xxx,    (numeric or string, required) The key is the bitcoin address, the numeric value (can be string) is the BTC amount
		      "data": "hex"      (string, required) The key is "data", the value is hex encoded data
		      ,...
		    }
		3. locktime                  (numeric, optional, default=0) Raw locktime. Non-0 value also locktime-activates inputs
		4. replaceable               (boolean, optional, default=false) Marks this transaction as BIP125 replaceable.
		                             Allows this transaction to be replaced by a transaction with higher fees. If provided, it is an error if explicit sequence numbers are incompatible.
		```
		- sending to udacity, need to create a receiving test wallet.
		- used: createrawtransaction '[{"txid":"c8dbc035617bd4e1fb662086319265a685cd13df13c315b1c4cab96171d30ade","vout":0}]' '{"2NFK8YHKT6hPPTDKTPP3c5bx7oPGrYhzj2y":0.030, "2N8EAh68kLLFohbghbpYgF9kkp12QAbztUm":0.0245}'
		- result: 0200000001de0ad37161b9cac4b115c313df13cd85a6659231862066fbe1d47b6135c0dbc80000000000ffffffff02c0c62d000000000017a914f20fe211102535e3c37bb0e659099387ddc035b587506225000000000017a914a456b8139f80d472a2f2a3f80e9516a270d885ae8700000000

### Decode raw transaction:
	- the raw transaction is outputed as a raw hex string, we can decode with the decoderawtransaction command.
	- decoderawtransaction "hexstring"
	- arguments:
		```
		"hexstring"      (string, required) The transaction hex string
		```
	- result:
		```
		{
		  "txid": "655419a854bdb808fb7cc3a68b8aab372e944ca028001ea247cead3ed00472eb",
		  "hash": "655419a854bdb808fb7cc3a68b8aab372e944ca028001ea247cead3ed00472eb",
		  "version": 2,
		  "size": 115,
		  "vsize": 115,
		  "locktime": 0,
		  "vin": [
		    {
		      "txid": "e787a27bda32c8b54ee501be46d2cfcd47c1566c8ef6ee339bdb7cd5c82b701c",
		      "vout": 0,
		      "scriptSig": {
		        "asm": "",
		        "hex": ""
		      },
		      "sequence": 4294967295
		    }
		  ],
		  "vout": [
		    {
		      "value": 0.03000000,
		      "n": 0,
		      "scriptPubKey": {
		        "asm": "OP_HASH160 f20fe211102535e3c37bb0e659099387ddc035b5 OP_EQUAL",
		        "hex": "a914f20fe211102535e3c37bb0e659099387ddc035b587",
		        "reqSigs": 1,
		        "type": "scripthash",
		        "addresses": [
		          "2NFK8YHKT6hPPTDKTPP3c5bx7oPGrYhzj2y"
		        ]
		      }
		    },
		    {
		      "value": 0.01950000,
		      "n": 1,
		      "scriptPubKey": {
		        "asm": "OP_HASH160 54ad1e8953876c90d3fc15798c687835ab3d3aee OP_EQUAL",
		        "hex": "a91454ad1e8953876c90d3fc15798c687835ab3d3aee87",
		        "reqSigs": 1,
		        "type": "scripthash",
		        "addresses": [
		          "2Mzxx8wGAmQQyCCrb2vXP4yxaYY9s9nepfy"
		        ]
		      }
		    }
		  ]
		}
		```

### Sign Raw Transaction:
	- in the object above, you will notice that the vin[0].asm and vin[0].hex values are empty, meaning the transaction has not been signed.
	- signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )
	- arguments:
		```
		1. "hexstring"     (string, required) The transaction hex string
		2. "prevtxs"       (string, optional) An json array of previous dependent transaction outputs
		     [               (json array of json objects, or 'null' if none provided)
		       {
		         "txid":"id",             (string, required) The transaction id
		         "vout":n,                  (numeric, required) The output number
		         "scriptPubKey": "hex",   (string, required) script key
		         "redeemScript": "hex",   (string, required for P2SH or P2WSH) redeem script
		         "amount": value            (numeric, required) The amount spent
		       }
		       ,...
		    ]
		3. "privkeys"     (string, optional) A json array of base58-encoded private keys for signing
		    [                  (json array of strings, or 'null' if none provided)
		      "privatekey"   (string) private key in base58-encoding
		      ,...
		    ]
		4. "sighashtype"     (string, optional, default=ALL) The signature hash type. Must be one of
		       "ALL"
		       "NONE"
		       "SINGLE"
		       "ALL|ANYONECANPAY"
		       "NONE|ANYONECANPAY"
		       "SINGLE|ANYONECANPAY"
		```
		- signrawtransaction '0200000001de0ad37161b9cac4b115c313df13cd85a6659231862066fbe1d47b6135c0dbc80000000000ffffffff02c0c62d000000000017a914f20fe211102535e3c37bb0e659099387ddc035b587506225000000000017a914a456b8139f80d472a2f2a3f80e9516a270d885ae8700000000'
		- skipped all optional commands, including txid
		- result:
		```
		{
		  "hex": "02000000000101de0ad37161b9cac4b115c313df13cd85a6659231862066fbe1d47b6135c0dbc800000000171600149bf6cf09dcfc7365d2c66109072723bf292fba9effffffff02c0c62d000000000017a914f20fe211102535e3c37bb0e659099387ddc035b587506225000000000017a914a456b8139f80d472a2f2a3f80e9516a270d885ae87024730440220098baf1c3bf855cc7524b2920d8885cc6e8f6198843dd0c1b6ae877caa777b81022042cf512867c55a0c6e795c42ca8cdecf5d7122f93aefdc8b222816569d0e9c5b01210253a3ad916905a1d69a35eabbd6bb79af8810a404da5a6f8f1c0f36209d8bcce500000000",
		  "complete": true
		}
		```
		- using the decoderawtransaction command outputs the transaction again, but this time the asm and hex are filled.
		- decoderawtransaction 02000000000101de0ad37161b9cac4b115c313df13cd85a6659231862066fbe1d47b6135c0dbc800000000171600149bf6cf09dcfc7365d2c66109072723bf292fba9effffffff02c0c62d000000000017a914f20fe211102535e3c37bb0e659099387ddc035b587506225000000000017a914a456b8139f80d472a2f2a3f80e9516a270d885ae87024730440220098baf1c3bf855cc7524b2920d8885cc6e8f6198843dd0c1b6ae877caa777b81022042cf512867c55a0c6e795c42ca8cdecf5d7122f93aefdc8b222816569d0e9c5b01210253a3ad916905a1d69a35eabbd6bb79af8810a404da5a6f8f1c0f36209d8bcce500000000
		- result:
			```
			{
			  "txid": "0b6672b1659752a92ae109b4abc936adf7e57a97637a6231d84691bca78466d4",
			  "hash": "51f05787e966660c2ed9cda5ef9762d336e6d7ae6f169869ee01846117e555a7",
			  "version": 2,
			  "size": 248,
			  "vsize": 166,
			  "locktime": 0,
			  "vin": [
			    {
			      "txid": "e787a27bda32c8b54ee501be46d2cfcd47c1566c8ef6ee339bdb7cd5c82b701c",
			      "vout": 0,
			      "scriptSig": {
			        "asm": "0014c794ee65db89222f408dfe1728d214f2496d7a72",
			        "hex": "160014c794ee65db89222f408dfe1728d214f2496d7a72"
			      },
			      "txinwitness": [
			        "3045022100dbf89096427b02c27a799a1d42fca9066bb1706d6874e7255a89084d7c39054c02203c792d0590e068d932966a3d5a84a099492d6975d8fe76b0ca191e20d2a76e8001",
			        "039c508c50597896b7d67efadf03864d3cee14941253fea08a7abc596479036f80"
			      ],
			      "sequence": 4294967295
			    }
			  ],
			  "vout": [
			    {
			      "value": 0.03000000,
			      "n": 0,
			      "scriptPubKey": {
			        "asm": "OP_HASH160 f20fe211102535e3c37bb0e659099387ddc035b5 OP_EQUAL",
			        "hex": "a914f20fe211102535e3c37bb0e659099387ddc035b587",
			        "reqSigs": 1,
			        "type": "scripthash",
			        "addresses": [
			          "2NFK8YHKT6hPPTDKTPP3c5bx7oPGrYhzj2y"
			        ]
			      }
			    },
			    {
			      "value": 0.01950000,
			      "n": 1,
			      "scriptPubKey": {
			        "asm": "OP_HASH160 54ad1e8953876c90d3fc15798c687835ab3d3aee OP_EQUAL",
			        "hex": "a91454ad1e8953876c90d3fc15798c687835ab3d3aee87",
			        "reqSigs": 1,
			        "type": "scripthash",
			        "addresses": [
			          "2Mzxx8wGAmQQyCCrb2vXP4yxaYY9s9nepfy"
			        ]
			      }
			    }
			  ]
			}
			```