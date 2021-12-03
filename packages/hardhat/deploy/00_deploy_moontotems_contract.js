const NFT_CONTRACT = "Creatures";
const FACTORY = "CreatureFactory";

const nftName = "Moons";
const nftSymbol = "MOON";
const nftBaseUri = "https://api.moontotems.com/token/";

// proxyRegistryAddress
// on rinkeby: "0xf57b2c51ded3a29e6891aba85459d600256cf317"
// on mainnet: "0xa5409ec958c83c3f309868babaca7c86dcb077c1"
const proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("now deploying contract: " + NFT_CONTRACT);
  // deploy Creatures
  const creatures = await deploy(NFT_CONTRACT, {
    // learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [nftName, nftSymbol, nftBaseUri, proxyRegistryAddress],
    log: true,
  });

  console.log("now deploying contract: " + FACTORY);
  // deploy creature factory
  const creatureFactory = await deploy(FACTORY, {
    from: deployer,
    args: [proxyRegistryAddress, creatures.address],
    log: true,
  });

  console.log(`setup ${NFT_CONTRACT} contract factory`);
  // eslint-disable-next-line no-undef
  const Moons = await ethers.getContractFactory(NFT_CONTRACT);
  const moons = await Moons.attach(deployer);

  console.log(
    `now transferOwnership of ${moons.address} to ${creatureFactory.address}`
  );
  await moons.transferOwnership(creatureFactory.address);
};

module.exports.tags = [NFT_CONTRACT, FACTORY];
