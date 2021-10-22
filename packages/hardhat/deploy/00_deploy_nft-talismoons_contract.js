const CONTRACT_NAME = "MoonTotems";

const nftName = "MoonTotems";
const nftSymbol = "TOTEM";
const nftBaseUri = "https://api.moontotems.com/token/";

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
