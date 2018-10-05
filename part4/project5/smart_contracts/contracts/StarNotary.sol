pragma solidity ^0.4.23;

import './ERC721Token.sol';

contract StarNotary is ERC721Token { 

    // defines the additional metadata we need for a star
    // the struct callback is similar to a json schema
    // more here: https://solidity.readthedocs.io/en/v0.4.24/structure-of-a-contract.html#struct-types

    // contains the structure for the Coordinates
    struct Coordinates {
        string Dec;
        string Mag;
        string Cent;
    }

    // contains the primary structure for the Star
    struct Star {
        // contains the name of the star, not necessary for the project but cool
        string name;

        // contains the story 
        string story;

        // this contains a unique string that joins dec, mag, and cent into a string to create uniqueness
        string coordString;

        // creates a mapping using coordString to enforce coord uniqueness
        mapping ( string => Coordinates) coords;
    }

    // maps the starId to it additional metadata
    mapping(uint256 => Star) public tokenIdToStarInfo;

    // create a mapping to hold all stars for sale
    mapping(uint256 => uint256) public starsForSale;

    // creates a star with a name, and a tokenId
    function createStar(string _name, uint256 _tokenId) public {
        // this is a type that will be deleted after the function call

        // assigns the current Star to a new variable called memory
        Star memory newStar = Star(_name);

        // saves the new star name under the tokenId
        tokenIdToStarInfo[_tokenId] = newStar;

        // calls the mint function established in earlier lessons, mega cool
        ERC721Token.mint(_tokenId);

    }

    // puts a star up for sale, with the tokenId and the price
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {

        // requires that ownly the owner of the token can run this function
        require(this.ownerOf(_tokenId) == msg.sender);

        // adds the star to the starsForSale mapping via tokenId and sets the price
        starsForSale[_tokenId] = _price;
    }

    // checks if the price for that star has been defined, marking it as for sale
    function buyStar(uint256 _tokenId) public payable{

        // requires that the star has been added to the starsForSale array
        // checks price is greater than 0, ensuring star is for sale
        require(starsForSale[_tokenId] > 0 );

        // grabs _price value from mapping, saves into starCost variable
        uint256 starCost = starsForSale[_tokenId];

        // grabs the address of the star owner, but using the .ownerOf function
        address starOwner = this.ownerOf(_tokenId);

        // requires the value passed with the transaction to be equal to or greater than the star value
        // to purchase the star
        require(msg.value >= starCost);

        // this clears the previous star state, removing the star from the starsForSale array
        // also clearing a ton of ERC721 authentication values necessary for the sale to process
        clearPreviousStarState(_tokenId);

        // uses the transferFrom helper from ERC721Token
        // expects ownerAddress, receiverAddress, and tokenId
        transferFromHelper(starOwner, msg.sender, _tokenId);

        // ensures that if the transaction value is greater than the starCost, returns extra to sender
        if(msg.value > starCost){

            // transfers the cost back to the sender, very helpful util!
            msg.sender.transfer(msg.value - starCost);

        }

        // rewards the starOwner with the value of the price, after the star is sold
        starOwner.transfer(starCost);
    }

    // private functions cannot be called outside of the contract, can only be invoked and used by
    // functions in the contract
    function clearPreviousStarState(uint256 _tokenId ) private{
        // clears approvals of token transfer permission following the ERC721 protocol
        tokenToApproved[_tokenId] = 0;

        // removes from starsForSale array
        starsForSale[_tokenId] = 0;
    }

}