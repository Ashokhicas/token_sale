var ZenexToken = artifacts.require("./ZenexToken.sol");

contract ("ZenexToken", function(accounts){
    var tokenInstance;
    it('initializes with correct values', function() {
        return ZenexToken.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then((name) => {
            assert.equal(name, 'Zenex Token', 'matches with the name provided');
            return tokenInstance.symbol();
        }).then((symbol) => {
            assert.equal(symbol, 'ZENT', 'matches with the symbol provided');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'Zenex Token v1.0', 'Has a correct standard');
        });
    });
    it('allocates the initial supply pon deployment', function() {
        return ZenexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,0000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((adminBalance) => {
            assert.equal(adminBalance, 1000000, 'it allocates initial supply');
        });
    });

    it('transfers ownership', function() {
        return ZenexToken.deployed().then(function(instance) {
            tokenInstance = instance;
            //test to throw an event if larger amount than the actual balance tried to send
            return tokenInstance.transfer.call(accounts[1], 99999999999999);
        }).then(assert.fail).catch(function(error) {
            //console.log(accounts[1]);
            //console.log(error.message);
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        }).then(function(reciept) {
            assert.equal(reciept.logs.length, 1, 'triggers event');
            assert.equal(reciept.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(reciept.logs[0].args._from, accounts[0], 'logs the account of sender');
            assert.equal(reciept.logs[0].args._to, accounts[1], 'logs the account of reciever');
            assert.equal(reciept.logs[0].args._value, 250000, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'it adds the amount in recievers account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'it deducts the amount from senders account');
        });
    });
});