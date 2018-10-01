// this grabs the StarNotary.sol file within /contracts
const StarNotary = artifacts.require('StarNotary')

// extracts the accounts array from the contract
contract('StarNotary', accounts =>{
    beforeEach(async ()=>{
        this.contract = await StarNotary.new({from:accounts[0]})
    })

    describe('can create a star', () =>{
        it('can create a star and get its name', async () =>{
            let tokenId = 1;

            // creates star with the provided name, and tokenId, from the first account.
            await this.contract.createStar('Awesome Star!', tokenId, {from: accounts[0]})

            assert.equal(await this.contract.tokenIdToStarInfo(tokenId), 'Awesome star!' )
        })

    })
})