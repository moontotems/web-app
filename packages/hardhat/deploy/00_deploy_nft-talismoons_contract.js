// const { utils } = require("ethers");

/*
// const CONTRACT_NAME = "Talismoons"

const nftName = "Talismoons";
const nftSymbol = "TMOON";
const nftBaseUri = "http://13.82.82.15:5000/api/token/";
*/

const CONTRACT_NAME = "MoonTotems";

const nftName = "MoonTotems";
const nftSymbol = "MOONT";
const nftBaseUri = "http://13.82.82.15:5000/api/token/";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("now deploying contract: " + CONTRACT_NAME);
  await deploy(CONTRACT_NAME, {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [nftName, nftSymbol, nftBaseUri],
    log: true,
  });
};

module.exports.tags = [CONTRACT_NAME];
