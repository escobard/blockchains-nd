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

        it('can be claimed', async ()=>{
            assert.equal(await contractInstance.starOwner(), 0);

            await contractInstance.claimStar({from: owner})

            // ensures the star has been claimed by user account[0]
            assert.equal(await contractInstance.starOwner(), owner)
        })
    })

    describe('Star can change owners', () =>{
        beforeEach(async ()=>{
            assert.equal(await contractInstance.starOwner(), 0);

            await contractInstance.claimStar({from: owner})
        })

        it('can be claimed by a second user', async ()=>{
            let secondUser = accounts[1];
            await contractInstance.claimStar({from: secondUser})
            assert.equal(await contractInstance.starOwner(), secondUser)
        })
    })
})