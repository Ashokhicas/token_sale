var ZenexToken = artifacts.require("./ZenexToken.sol");

contract ("ZenexToken", function(accounts){

    it('sets the total supply pon deployment', function() {
        return ZenexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,00,0000')
        })
    });
})