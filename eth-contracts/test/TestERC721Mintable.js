const truffleAssert = require('truffle-assertions');

var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('ERC721MintableComplete', accounts => {

    const owner = accounts[0];
    const name = "TestHouseToken";
    const symbol = "THT";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    const acc_1 = accounts[1];
    const acc_2 = accounts[2];
  
    const acc_1_count = 11;
    const acc_2_count = 16;
    max_count = 5;   

    describe('should match erc721 spec', function () {        
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: owner});
            //mint multiple tokens
            for(let i = 0; i < max_count; ++i){
                await this.contract.mint(acc_1, i + acc_1_count);
            }
            for(let i = 0; i < max_count; ++i){
                await this.contract.mint(acc_2, i + acc_2_count);
            }            
        })

        it('should return total supply', async function () { 
            let total_supply = await this.contract.totalSupply.call({from: owner});           
            expect(Number(total_supply)).to.equal(max_count + max_count);
            
        })

        it('should get token balance', async function () { 
            let balance_1 = await this.contract.balanceOf.call(acc_1);
            let balance_2 = await this.contract.balanceOf.call(acc_2);           
            expect(Number(balance_1)).to.equal(max_count);
            expect(Number(balance_2)).to.equal(max_count);           
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenIds = [11,12,13,14,15,16,17,18,19,20];   
            let token_uri = await this.contract.tokenURI(tokenIds[1], {from: owner});            
            let exptoken_uri = baseTokenURI + tokenIds[1];                       
            assert.equal(token_uri,exptoken_uri,"Does not match expected tokenURI");
        })
       
        it('should return token name', async function () {         
            expect(await this.contract.name({from: acc_2})).to.equal(name);         
        })
        it('should return token symbol', async function () {
            expect(await this.contract.symbol({from: acc_2})).to.equal(symbol);
        })
        it('should return baseTokenURI', async function () {
            expect(await this.contract.baseTokenURI({from: acc_2})).to.equal(baseTokenURI);
        })
        it('should transfer token from one owner to another', async function () { 
            let tokenId = 12;
            await this.contract.safeTransferFrom(acc_1, acc_2, tokenId, {from: acc_1});            
            let owner = await this.contract.ownerOf(tokenId);           
            expect(owner).to.equal(acc_2);            
        })
    });

    describe('should have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: owner});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let err = false;
            try {
                await this.contract.mint(acc_2, 6, {from: acc_1});
            } catch {
                err = true;
            }           
            expect(err).to.equal(true);
        })

        it('should return contract owner', async function () { 
            let contract_owner = await this.contract.owner.call();          
            expect(contract_owner).to.equal(owner);
        })

    });
})