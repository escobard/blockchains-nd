// this grabs the StarNotary.sol file within /contracts
const starDefinition = artifacts.require('StarNotary')

// extracts the accounts array from the contract
contract('StarNotary', accounts =>{

    // Sets owner's account
    let owner = accounts[0]
    let contractInstance;

    // like mocha's beforeEach
    beforeEach(async () =>{

        // grabs the contract instance from contract obj
        contractInstance = await starDefinition.new({from: owner})
    })

    describe('StarNotary basics', () =>{
        it('has correct name', async ()=>{
            assert.equal(await contractInstance.starName(), 'Awesome Udacity Star');
        })
    })
})