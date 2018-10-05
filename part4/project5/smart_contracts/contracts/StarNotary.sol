pragma solidity ^0.4.23;

import './ERC721Token.sol';

contract StarNotary is ERC721Token { 

    // defines the additional metadata we need for a star
    // the struct callback is similar to a json schema
    // more here: https://solidity.readthedocs.io/en/v0.4.24/structure-of-a-contract.html#struct-types
    
    /// @notice Contains the stucture of the star coordinates
    /// @dev key of structure is the string of the combined star coordinates
    /// @param dec string, contains dec meta data
    /// @param mag string, contains mag meta data
    /// @param cent string, contains cent meta data
    struct Coordinates {
        string dec;
        string mag;
        string cent;
    }

    /// @notice Contains the stucture of the star metadata
    /// @dev key of structure is the provided tokenId - this logic could be improved
    /// @param name string, contains star name
    /// @param story string, contains star story
    /// @param coordString string, contains unique coordinate string, composed of all coordinates
    /// @param coord mapping, argument is coordString, contain Coordinates structure
    struct Star {
        // contains the name of the star, not necessary for the project but cool
        string name;

        // contains the story 
        string story;

        // this contains a unique string that joins dec, mag, and cent into a string to create uniqueness
        string coordsString;

        // creates a mapping using coordString to enforce coord uniqueness
        mapping ( string => Coordinates) coords;
    }

    /// @notice Contains the mapping for the star data
    /// @dev key of structure is the provided tokenId - this logic could be improved
    /// @param Star structure, contains star metadata 
    mapping(uint256 => Star) public tokenIdToStarInfo;

    /// @notice Contains the mapping for available stars for sale
    /// @dev key of structure is the provided tokenId - this logic could be improved
    /// @param tokenId uint256, contains tokenId
    mapping(uint256 => uint256) public starsForSale;

    /// @notice Handles the creation of a star, and its metadata logic, could be refactored into several more functions
    /// @dev extremely logic heavy, need to introduce gradual improvements. Writes star metadat to stars, enforces uniqueness, ensures no existing stars (by token or by coordinates) are allowed 
    /// @param name string, contains star name
    /// @param story string, contains star story
    /// @param dec string, contains dec meta data
    /// @param mag string, contains mag meta data
    /// @param cent string, contains cent meta data 
    /// @param tokenId number, contains tokenId - logic could be improved 
    function createStar(string name, string story, string dec, string mag, string cent, uint256 tokenId) public {

        // creates unique coord string from the dec, string, and cent functions, could be split into more functions
        // more on the used function here: https://ethereum.stackexchange.com/questions/729/how-to-concatenate-strings-in-solidity
        string memory coordsString = string(abi.encodePacked(dec,mag,cent));

        // this is a type that will be deleted after the function call
        // assigns the current Star to a new variable called newStar
        Star memory newStar = Star( name, story, coordsString);

        // saves the new star name under the tokenId
        tokenIdToStarInfo[tokenId] = newStar;

        // fetches our saved star from the mapping, needs to be in this order in order to add child mapping
        Star storage createdStar = tokenIdToStarInfo[tokenId];
        
        // adds unique coordinates to new Coordinates structure within our new Star structure
        createdStar.coords[coordsString] = Coordinates(dec, mag, cent);

        // calls the mint function established in earlier lessons, mega cool
        ERC721Token.mint(tokenId);

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