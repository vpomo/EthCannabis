var EthCannabis = artifacts.require("./EthCannabis.sol");
//import assertRevert from './helpers/assertRevert';

contract('EthCannabis', (accounts) => {
    var contract;
    //var owner = "0x2A98a9512C52b5eF0064F86d0141A0075f27F27b";
    var owner = accounts[0];
    var maxTotalSupply = 300*10**6 * 10**18;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await EthCannabis.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance contract', async ()  => {
        var totalSupplyTest = await contract.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal(Number(totalSupplyTest), Number(maxTotalSupply));

        var balanceOwner = await contract.balanceOf(owner);
        assert.equal(Number(totalSupplyTest), balanceOwner);
    });

    it('verification of transfer Token', async ()  => {
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.transfer(accounts[2], 1*10**18, {from:accounts[0]});
        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(1*10**18, balanceAccountTwoAfter);

    });

    it('Checking the purchaise of tokens', async ()  => {
        var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.buyTokens(accounts[3], {from:accounts[3], value: 0});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountThreeBefore);
        assert.equal(1000 * 10**18, Number(balanceAccountThreeAfter));

        var balanceAccountFourAfter = await contract.balanceOf(accounts[4]);
        await contract.buyTokens(accounts[4], {from:accounts[4], value: 0.001 * 10**18});
        var balanceAccountFourAfter = await contract.balanceOf(accounts[4]);
        //console.log("balanceAccountFourAfter = " + balanceAccountFourAfter);
        assert.equal(4000 * 10**18, Number(balanceAccountFourAfter));

});

});



