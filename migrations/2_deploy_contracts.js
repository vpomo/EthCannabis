const EthCannabis = artifacts.require('./EthCannabis.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var owner = "0x2A98a9512C52b5eF0064F86d0141A0075f27F27b";
    deployer.deploy(EthCannabis, owner);
};
