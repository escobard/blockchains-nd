## Lesson 5

topics covered in the lesson:
```
	Digital Assets - You will be able to discuss what digital assets are and how they are related to the blockchain.

	Encode/Decode Data - You'll learn to explain the purpose that encoding, decoding, and what this purpose this serves for digital assets.

	Encode/Decode Data - You'll generate raw data from different types of digital assets from the terminal.

	Encode/Decode Data - You will learn to generate raw data from different types of digital assets using Javascript

	Proof of Existence - You'll learn a new concept "proof of existence" and see one way this is implemented using an online service known as poex.

	Secure Assets Using Your Digital Identity - You will understand how a identity can be used to secure digital assets and why this is helpful.
	
	Blockchain Generations - You will be able to discuss digital asset management and how it fits into the overall scheme of blockchain generations.
```
### How do digital assets work?

- how do computers understand the contents of a file?
- how do they present those files to people? 

## Overview of E n D

Its the process of producing and interpreting information, 
- used among many fields of study, 
- in computer science its facilitating the sending and receiving of data, 
- process of transalating a message between human readable data and into raw data to allow computers to read the information in a format they understand.
- later this is decoded into a format that people can understand and work with
- end result is computers get to communicate in a format they use to improve speed and transmission, and we get to communicate in a format we use such as live video, images, etc

### Encoding
- process of putting a sequence fo characters into a specialized format for efficient transmission or storage.
- help us send and receive messages between each other, when speaking to another person, if you understand the language you can speak freely, and understand each other  (dummy version)
- but if you are speaking to a computer, the computer needs to understand what you're talking about - this is known as ENCODING
- each of these encoding schemes can take in information to encode it as RAW DATA
- this raw data is what is then transmitted between computers

#### Encoding vs encryption
- with encryption, you are making a secret key in a way that cannot be reversed and ONLY you have access to.
- with encoding, you're simply trying to re-format something to make it easier to transmit. 
	- encoding isn't the same as compression either
		- compression: aims to make files smaller
		- encoding: may end up with a larger file, but speed in which it can be read and transmitted, is improved.

### Decoding 
- takes encoded raw unredable files, and converts them back into human readable format.
- convert the raw data files back into the format they started as

### E n D formats
- all serve the purpose of translating human readable data into computer readable medium that
can be more easily translated

#### ASCII
- American standard code for information exchange
- based on the idea that you can represent text as numbers
- and these numbers can be transalated by computers to binary code
- matches the text we write into numbers that computers recognize, using binary code to transmit information
- can try out some E n D with ASCII by going to: www.unit-conversion.info/texttools/ascii

#### Hexadecimal
- a more concise and human readable representation of binary code
- uses a combination of single digit numbers, and the first 6 letters of the alphabet to represent all binary numbers (1-15)
- more common to work with among asambly languages
- to check out hex E n D, head to converstring.com/encodedecode/hexencode

#### Base 64
- encoding scheme meant to represent data as numbers in a string format
- turns data from information into any one of 64 characters (check any base64 table)
- goes through the alphabet uppercase first, to lower case, 0-9, and + / being the last characters
- can check out at base64encode.org


## Encoding files, and other terminal commands


### Encode and Decode Text from Terminal

- this ENCODES the string
String to hex: `xxd -p <<< "Blockchain Developer"`

- this DECODES the string
Hex to string: `echo 426c6f636b636861696e20446576656c6f7065720a|xxd -r -p`

### Encode and Decode Text from Terminal Using Files
Create file: `touch hello.txt`
Add text to file

- this creates a new file, and the new file's contents are the original file's encoded in hex 
String to Hex: `xxd -p hello.txt helloEncoded.txt`

- this decodes the file,returns the content in a new file
Hex to String:` xxd -p -r helloEncoded.txt helloDecoded.txt`

### Encode and Decode Image from Terminal Using Files
Find image file and place in directory
Image to Hex: `xxd -p cat.jpg cat.txt`
Hex to Image:` xxd -p -r cat.txt catDecoded.jpg`

### Verify Digital Assets

- Check the integrity of the digital asset to confirm that it contains the correct sequence of bytes and has not been wrongfully accessed or altered.  
	- integrity is only about making sure that a given file is exactly the same as it was at its source 
	it doesnt refer to the trustworthiness of that source

### Proof of existence
- How we verify digital assets in a blockchain
- A concept (and a service) that publicly proves and authenticates any digital asset on the blockchain by verifying its hash. 
- different from proof of work, (for mining).
- can be compared to a notary:
	- in a real life notary, you go to an authorized official with a document who authorizes it, and stamps it, verifying the document
	- in a blockchain, proof of existence verifies the authenticity of documents on a blokchain
- when information about a digital asset is stored on a notary blockchain, only its hash is saved
- therefore the actual documents and contents are not publically revealed

### POEX.IO
- https://poex.io/
- a notary service hat authorizes data, built on the bitcoin blockchain
- validates digital assets, storing them in the bitcoin blockchain
	- asset block hashes (from another blockchain, service, etc) are stored forever
- creates an identifier based on the time the digital asset was submitted
- uses the following steps
	* digital asset is hashsed via sha256
	* that has is appended to an identifier (for example 0x444f4... - the idetintifier and the 256 code outputted by the sha256 algo)
	* the hash + identifier is put into a generated transaction
	* TX is marked with OP_RETURN marking the transaction as unspendable

### More POE notes - taken from lecture (property of Udacity):

Why do we need POE
Before trying to use this for ourselves, here’s a few quick ideas over why you might even want to to do this in the first place.

Helps you demonstrate data ownership without revealing actual data.

This is useful for things like copyrighted material or patents.
Checks for the integrity of your digital asset. Any proof of existence will recognize your document FOREVER.

Even the slightest difference will be recognized allowing you to be sure your asset hasn’t changed.
Provides document Time stamping. You can use this to prove certain information existed at a certain time.

This can be useful in cases where you want to prove who was the original owner of the document.
Certifies the existence of the document without the need for a central authority.

Similar to many blockchain concepts this decentralized proof can’t be erased or modified by anyone.

POE Algorithms
There are a different of algorithms to demonstrate Proof of Existence. The two we have chosen to focus on here are SHA256 and MD5.

They both serve the same purpose. They’re a way to hash a digital asset so it can be embedded in a transaction in the blockchain. This allows people to verify that a document existed at a certain point in time.

SHA256
This is an algorithm we’ve seen already in several different parts of the Bitcoin network. It’s used in mining as part of the proof of work algorithm.

It’s also used to create secured bitcoin addresses.

SHA256 stands for Secure Hash Algorithm. It is a one-way hashing function that takes in any piece of data and produces a unique hash.

This is the algorithm POEX uses to secure their digital documents.

MD5
Next, the MD5 algorithm is a hash function that takes in a String input and produces a 128-bit hash value. This value is usually shown as a 32-character hexadecimal number that humans can read.

Goals of POE Algorithms
While each method does things a bit differently, the important thing to remember is their purpose.

They hash digital assets to hide the actual content. Once the hashed data is embedded in a transaction in the blockchain, the existence of that transaction in the blockchain proves that the document existed at the time the transaction got included into a block.


Wrap Up
To recap, in this section we covered:

Proof of Existence: The concept that publicly proving and authenticating any digital asset on the blockchain by verifying its hash.
We saw a demo using the POEX online document notarization service.
Lastly, we discussed different algorithms commonly used for proof of existence such as SHA256 and MD5.

### Secure an Asset
- Protect the resource (asset) from wrongfull access or alteration
- Why secure an asset? 
	- a banana is directly useful because you can eat it
	- a document is indirectly useful because it may be useful at a later date as evidence
- to prove that I own a photo, it is encoded into a data object with multiple properties
	- refer to: https://app.frame.io/r/8cad91b0-341c-486a-bffc-2eeefd775a73?f=20017a87-7b4f-4e4a-877b-9e209486515b
	- this will be super useful for project 4.
		- maybe start with a static asset / address at first
		- properties of the object include:
			- image: { encodedData, TypeOfImage, bitcoinWalletAddress}
			- Time: {'Timestamp code'}
			- previousBlockHash: {'Previous hash'}
- the user has included their digital identity, to SECURE the digital asset by embedding their information in the same block
	- that's all that needs to happen to SECURE an asset on a blockchain, providing proof that it existed at one time.
	- easily done with some tweaks to the current block class, start with an IMAGE first before taking on the star notary service

## Blockchain Generations

- bitcoin, litecoin, monero are known as the first generation of blockchains, or blockchain 1.0.
	- these block chains focused on moving value, maintaining a ledger, and creating ideal payment systems.
- blockchain 2.0 (ethereum, ethereum classic, otum, etc) were built on the concept of recording transactions on the blockchain.
	- to do this, they implemented a way to utilize logic to implement the data in different ways
	- this is logic is what we refer to as smart contracts, originally created by etherueum.

### Smart Contracts

- smart contracts written up between parties are coded into the blockchain.
- these contracts are triggered when a transaction is initialized, and executed based to the coded terms.
- think of smart contracts as legal contracts that are based on code.
- smart contracts determine HOW a transaction will be spent, and can send money to multiple users within a single transaction.
- smart contracts allow developers to create projects on top of the blockchain platform.
- this allows developers to launch blockchain based businesses and de-centralized governments.
- these smart contracts also give businesses the potential to automate many tasks and processes that would otherwise be impossible.
- its allowing us to build entirely new types of applications, known as de-centralized apps.