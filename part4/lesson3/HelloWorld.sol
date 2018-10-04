// specifies the version of solidity for the contract
pragma solidity ^0.4.23;

// starts the contract object, can be thought of as a type of CLASS like in JS
contract HelloWorld { 
    
    // basic syntax, no need to expand further
    string public message;
    
    // runs first with the contract, can be thought of the same was as a js class constructor
    constructor() public { 
        message = "Hello World!";
    }
    
    // this function retruns the message string
    // the view value here is an additional type of function provided by solidity, expected to return something visually
    function getMessage() public view returns(string) { 
        return message;
    }
}