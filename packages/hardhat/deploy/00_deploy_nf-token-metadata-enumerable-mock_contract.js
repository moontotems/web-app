// const { utils } = require("ethers");

const nftName = "Moons";
const nftSymbol = "MOON";
const nftBaseUri = "http://13.82.82.15:5000/api/token/";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFTokenMetadataEnumerableMock", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [nftName, nftSymbol, nftBaseUri],
    log: true,
  });
};

module.exports.tags = ["NFTokenMetadataEnumerableMock"];
