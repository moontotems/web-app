// const { utils } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFTokenEnumerableMock", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [],
    log: true,
  });
};

module.exports.tags = ["NFTokenEnumerableMock"];
