var Migrations = artifacts.require("./Migrations.sol");
var CitizensRecord = artifacts.require('./CitizensRecord.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CitizensRecord);
};
