// const { utils } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFTokenMetadataEnumerableMock", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: ["CryptoMoons", "CMOON"],
    log: true,
  });
};

module.exports.tags = ["NFTokenMetadataEnumerableMock"];
