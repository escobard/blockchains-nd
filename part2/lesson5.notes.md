# Lesson 5

## Private and Public blockchains
	- in all public blockchains, we are all able to participate without needing explicit permission.

### Public vs Private blockchains
	- Public:
		- permissions - permissionless
			- allows anyone to participate or benefit from the technology
			- this allows for the users to interact with the blockchain without building their own ecosystem.
			- the success of bitcoins public protocol let to the creation of Ethereum, which enhances the original bitcoin protocols.
			- are permissionless and can be maintained by anyone with sufficient computing power to do so.
			- allows for full transparency of the information contained.
		- scalability - more difficult
			- transactions on the public chain are time restrictive.
		- vulnerability - less vulnerable
			- time restrictions improve security and control supply, but impact scalability of transactions that the platform can process at any given time.
		- compliance - more difficult
			- when nations enact laws against blockchain protocols, 
	- Private:
		- permissions - permissioned
			- closed, require permission
			- typically operate under centralized control.
		- scalability - simpler
			- efficiency with scalability and regulatory requirements
			- 
		- vulnerability - more vulnerable
			- vulnerability of their network, due to centralized governance (private blockchains are considered centralized, since the chain is not share publically).
			- low transparency they restrict information from being seen by the general public, they also rely on limited private networks to maintain the integrity of the blockchain itself.
		- compliance - less difficult

## Private and public blockchains interaction
	- interaction is still possible, and apparently rather common
		- imagine this scenario:
			- Private blockchain needs to log bitcoin transaction activites.
			- Logger service (private blockchain) would monitor new blocks added to the public blockchain
			- These would be tracked via transaction hashes.
		- to store the public transaction data into our private blockchain, we would need to reference the options available to us by referring to the protocol's documentation.
		- We are using bitcoin core for our purposes.
			- with OP_RETURN we can store up to 40 bytes of data in a transaction via the .asm property, for up to 40 bytes.
			- To achieve this, we pass the data into a SHA256 Hash algorythm, which stores the data as 256 bits.
			- This is further reduced by the Binary encoding algorythm, which further reduces that down to 8 bits per byte (not quite clear here)
			- This allows us to store data in an 256 bits / 8 bits = 32 bytes format.
		- The transaction hash allows us to track its uniqueness as an ID, to transfer data between blockchains.
		- connecting data between blockchains is known as cross-chain functionality.
			- allows a series of protocols that work in harmony to deliver decentralized applications
			- this is becoming more common with blockchain projects
		- Polkadot:
			- configuring itself as an intemediary between blockchains.
			- uses a blockchain called relay, which captures transactions and activity within blockchains.
				- uses a second blockchain called parachains, which gathers and process transactions
			- finally, the service bridgets the gap with primary blockchains connecting the services together.
			- 