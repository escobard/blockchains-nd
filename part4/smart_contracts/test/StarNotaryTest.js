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

            assert.equal(await this.contract.tokenIdToStarInfo(tokenId), 'Awesome Star!' )
        })

    })

    describe('buying and selling stars', () =>{
        let user1 = accounts[1]
        let user2 = accounts[2]

        let starId = 1;

        // this must be set in wei, smallest denominator of ether

        // this function takes the first argument's value, vs the second argument's token cost
        // .toWei() converts to wei, can convert to many other unit types
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async () => {

            // gives new star to user1
            await this.contract.createStar('awesome star', starId, {from: user1})
        })

        it('user1 can put up their star for sale', async () => {

            // puts star up for sale, function REQUIRES the seller to be the OWNER of the star
            // this is possible via the mapping created on ERC721Token/line14
            // mappings are SUPER important for data consistency!
            await this.contract.putStarUpForSale(starId, starPrice, {from: user1})

            // checks that the star is for sale by checking the price vs the stars
            assert.equal(await this.contract.starsForSale(starId), starPrice);


        })

        describe('user2 can buy a star that was put up for sale', () =>{
            beforeEach(async () =>{
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async () =>{

                // buys star, sends transaction object with user2 address, and value for star
                await this.contract.buyStar(starId, {from: user2, value: starPrice})
            })

            it('user2 correctly has their balance changed', async () =>{
                let overpaidAmount = web3.toWei(.05, 'ether');

                // another helper function of web3, gets the balance of the currency
                // under the user's account 
                const balPreTrans = web3.eth.getBalance(user2);

                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0})

                // this is expected to be ~.04, since the star price is .01 wei
                // the buyStar function returns the extra value 
                const balAftTrans = web3.eth.getBalance(user2);

                // checks balanceBeforeTransaction - BalanceAfterTransaction = starPrice
                // returns true if user is refunded for any extra value sent to the buyStar
                assert.equal(balPreTrans.sub(balAftTrans), starPrice)
            })
        })
    })
})