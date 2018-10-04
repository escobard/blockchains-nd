# Lesson 4

## Visibility / getters

- https://solidity.readthedocs.io/en/v0.4.24/contracts.html#visibility-and-getters
    - Public: Part of the contract interface which can be either called internally or by users.
    - Private: Visible / accessible for the contract only.
    - Internal: Visible / accessible for the contract or contract children. 
    - External: Included within the contract interface, can only be called by other contracts / users, cannot be called internally. 

## OpenZeppelin

- `npm init y` initiates npm file with all base settings
- using V2.0.0 of openzeppelin for now
- https://github.com/OpenZeppelin/openzeppelin-solidity
- helpful for using pre-determined contracts, will choose not to use for now