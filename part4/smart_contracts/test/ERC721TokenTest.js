// grabs the contract artifact, necessary to test contract with Truffle
const ERC721Token = artifacts.require('ERC721Token');

// initiates our contract
contract('ERC721Token', accounts =>{
    let defaultAccount = accounts[0];

    // adds more accounts to test transfering ownership with
    let user1 = accounts[1];
    let user2 = accounts[2];
    let operator = accounts[3];

    // loads our contract prior to each test
    beforeEach(async, () =>{
        // assigns contract to the constructor .this variable
        this.contract = await ERC721Token.new({from: defaultAccount})
    })

    describe('can create a token', () =>{

        // creates our new token
        let tokenId = 1;

        // declares empty variable for log
        let tx;

        beforeEach(async () =>{

            // gives the token created above to user1
            tx = await this.contract.mint(tokenId, {from: user1})
        })

        it('confirms ownerOf tokenId is user1, confirming mint transfer of ownership', async () =>{
            assert.equal(await this.contract.ownerOf(tokenId), user1)
        })

        it('confirms balanceOf user1 is incremented by 1, confirming mint increment', async () =>{
            
            // this returns the user's balance, wrapped in a JS object
            let balance = await this.contract.balanceOf(user1);

            assert.equal(balanceToNumber(), 1);
        })

        it('emits the correct event during creation of a new token', async () =>{

            // checks the event name to match what we expect
            assert.equal(tx.logs[0].event, "Transfer");
        })
    })
})