### Bitcoin core - test network coin faucet
	- faucets come and go, but we can find current faucets for testnet here: https://testnet.manu.backend.hamburg/faucet
	- copy your address into the input to get coins

### Bitcoin Core - debugger
	- for a list of commands, (won't list all here, only most used) type in help into the console

### Bitcoin Core - blockchains
	- getblockchaininfo: Returns various state information about blockchain processing.
	- getblockcount: Returns the number of blocks in the blockchain.
	- verifychain: Verifies blockchain database.

### Bitcoin core - hash commands
	- getblockhash: Returns hash of a block at the block number provided
	- getnetworkhashps: Returns an estimated network hashes per second based on a specified number of recent blocks.
	- getbestblockhash: Returns the hash of the best block.
	- best block - most recent block you've synced to with your local copy of the chain.
	- hash value: digital fingerprint for information

### Bitcoin core - blocks
	- getblock: Returns details of block information.
	- getblockheader: Returns information about the block header.
	- generate: Immediately mines the specified number of blocks to an address in the wallet

### Bitcoin core - wallet
	- getwalletinfo: Returns an object containing various information about a wallet’s state.
	- listwallets: Returns a list of currently loaded wallets.

### Bitcoin core - mempool
	- getmempoolinfo: Returns details on the active state of the transaction memory pool.
	- getrawmempool: Returns all transaction details in the memory pool.
	- getmempoolentry: Returns mempool data for a given transaction.

### Bitcoin core - transactions
	- getchaintxstats: Compute statistics about the total number and rate of transactions in the chain
	- getrawtransaction: Returns raw transaction data
	- listtransactions: Returns a list of transactions for a given account

### Bitcoin core - signature commands
	- signrawtransaction: Sign inputs for a raw transaction.
	- signmessage: Sign message with the private key of an address.
	- signature: establishes proof of ownership for each transaction on the blockchain

### Bitcoin core - network
	- getnetworkinfo: Returns information about the state of the peer-to-peer network.
	- getpeerinfo: Returns data about each connection network node.
	- getconnectioncount: Returns the number of connections to other nodes.

### Bitcoin core - mining
	- getmininginfo: Returns an object that contains mining-related information.
	- getblocktemplate: Returns data needed to construct a block.
	- prioritisetransaction: Accepts the transaction into mined blocks at a higher or lower priority.