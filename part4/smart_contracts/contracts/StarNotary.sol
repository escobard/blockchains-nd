pragma solidity ^0.4.23;

contract StarNotary { 

    string public starName; 
    address public starOwner;

    // logs the new owner of the star, by creating an event, which is a type of function
    event starClaimed(address owner);
    
    constructor() public { 
        starName = "Awesome Udacity Star";
    }

    function claimStar() public { 
        starOwner = msg.sender;

        // this is the callback syntax for the event function type
        emit starClaimed(msg.sender);
    }
}