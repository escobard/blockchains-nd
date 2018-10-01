pragma solidity ^0.4.23;

import './ERC721Token.sol';

contract StarNotary is ERC721Token { 

    // defines the additional metadata we need for a star
    // the struct callback is similar to a json schema
    // more here: https://solidity.readthedocs.io/en/v0.4.24/structure-of-a-contract.html#struct-types
    struct Star {
        string name;
    }

    // maps the starId to it additional metadata
    mapping(uint256 => Star) public tokenIdToStarInfo;

    function createStar(string _name, uint256 _tokenId) public {
        // this is a type that will be deleted after the function call

        // assigns the current Star to a new variable called memory
        Star memory newStar = Star(_name);

        // saves the new star name under the tokenId
        tokenIdToStarInfo[_tokenId] = newStar;

        // calls the mint function established in earlier lessons, mega cool
        ERC721Token.mint(_tokenId);

    }

}