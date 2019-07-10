const ZenexToken = artifacts.require("ZenexToken");

module.exports = function(deployer) {
  deployer.deploy(ZenexToken);
};
