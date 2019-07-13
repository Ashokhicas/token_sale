var ZenexTokenSale = artifacts.require("./ZenexTokenSale.sol");

contract ("ZenexTokenSale", function(accounts){
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000; //in wei ; in ether = 0.001 ether //use https://etherconverter.online/ to calculate the same
    it('initializes the contract with correct values', function() {
        return ZenexTokenSale.deployed().then((i) => {
            tokenSaleInstance = i;
            return tokenSaleInstance.address;
        }).then((address) => {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then((address) => {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then((price) => {
            assert.equal(price, tokenPrice, 'token price is correct');
        })
    })
});