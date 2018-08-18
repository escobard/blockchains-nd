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
Image to Hex: `xxd -p cat.png cat.txt`
Hex to Image:` xxd -p -r cat.txt catDecoded.png`