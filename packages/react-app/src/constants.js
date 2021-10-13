// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = 'aefe9cfbdaba49f296934797722852b0'

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = 'PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8'

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = '0b58206a-f3c0-4701-a62f-73c7243e8c77'

/*
  contract error message codes:

  string constant ZERO_ADDRESS = "003001";
  string constant NOT_VALID_NFT = "003002";
  string constant NOT_OWNER_OR_OPERATOR = "003003";
  string constant NOT_OWNER_APPROVED_OR_OPERATOR = "003004";
  string constant NOT_ABLE_TO_RECEIVE_NFT = "003005";
  string constant NFT_ALREADY_EXISTS = "003006";
  string constant NOT_OWNER = "003007";
  string constant IS_OWNER = "003008";
*/
export const NFT_CONTRACT_ERROR_CODE_MAP = {
  '003001': {
    errorCode: 'ZERO_ADDRESS',
    // eslint-disable-next-line quotes
    message: `Can't transfer to ZERO_ADDRESS.`
  },
  '003002': {
    errorCode: 'NOT_VALID_NFT',
    message: 'Not a valid NFT.'
  },
  '003003': {
    errorCode: 'NOT_OWNER_OR_OPERATOR',
    message: 'Not owner or operator.'
  },
  '003004': {
    errorCode: 'NOT_OWNER_APPROVED_OR_OPERATOR',
    message: 'Not owner, approved or operator.'
  },
  '003005': {
    errorCode: 'NOT_ABLE_TO_RECEIVE_NFT',
    message: 'Not able to receive NFT.'
  },
  '003006': {
    errorCode: 'NFT_ALREADY_EXISTS',
    message: 'NFT already exists.'
  },
  '003007': {
    errorCode: 'NOT_OWNER',
    message: 'Not owner.'
  },
  '003008': {
    errorCode: 'IS_OWNER',
    message: 'Is owner.'
  }
}

export const MIN_TOKEN_ID = 0
export const MAX_TOKEN_ID = 9457

export const DESKTOP_HEADER_HEIGHT = 48
export const MOBILE_HEADER_HEIGHT = 90

export const NETWORKS = {
  localhost: {
    name: 'localhost',
    color: '#666666',
    chainId: 31337,
    blockExplorer: '',
    rpcUrl: 'http://' + window.location.hostname + ':8545'
  },
  mainnet: {
    name: 'mainnet',
    color: '#ff8b9e',
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: 'https://etherscan.io/'
  },
  kovan: {
    name: 'kovan',
    color: '#7003DD',
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: 'https://kovan.etherscan.io/',
    faucet: 'https://gitter.im/kovan-testnet/faucet' // https://faucet.kovan.network/
  },
  rinkeby: {
    name: 'rinkeby',
    color: '#e0d068',
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: 'https://faucet.rinkeby.io/',
    blockExplorer: 'https://rinkeby.etherscan.io/'
  },
  ropsten: {
    name: 'ropsten',
    color: '#F60D09',
    chainId: 3,
    faucet: 'https://faucet.ropsten.be/',
    blockExplorer: 'https://ropsten.etherscan.io/',
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
  },
  goerli: {
    name: 'goerli',
    color: '#0975F6',
    chainId: 5,
    faucet: 'https://goerli-faucet.slock.it/',
    blockExplorer: 'https://goerli.etherscan.io/',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
  },
  xdai: {
    name: 'xdai',
    color: '#48a9a6',
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: 'https://dai.poa.network',
    faucet: 'https://xdai-faucet.top/',
    blockExplorer: 'https://blockscout.com/poa/xdai/'
  },
  matic: {
    name: 'matic',
    color: '#2bbdf7',
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    faucet: 'https://faucet.matic.network/',
    blockExplorer: 'https://explorer-mainnet.maticvigil.com//'
  },
  mumbai: {
    name: 'mumbai',
    color: '#92D9FA',
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    faucet: 'https://faucet.matic.network/',
    blockExplorer: 'https://mumbai-explorer.matic.today/'
  },
  localArbitrum: {
    name: 'localArbitrum',
    color: '#50a0ea',
    chainId: 153869338190755,
    blockExplorer: '',
    rpcUrl: 'http://localhost:8547'
  },
  localArbitrumL1: {
    name: 'localArbitrumL1',
    color: '#50a0ea',
    chainId: 44010,
    blockExplorer: '',
    rpcUrl: 'http://localhost:7545'
  },
  rinkebyArbitrum: {
    name: 'Arbitrum Testnet',
    color: '#50a0ea',
    chainId: 421611,
    blockExplorer: 'https://rinkeby-explorer.arbitrum.io/#/',
    rpcUrl: 'https://rinkeby.arbitrum.io/rpc'
  },
  arbitrum: {
    name: 'Arbitrum',
    color: '#50a0ea',
    chainId: 42161,
    blockExplorer: 'https://explorer.arbitrum.io/#/',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    gasPrice: 0
  },
  localOptimismL1: {
    name: 'localOptimismL1',
    color: '#f01a37',
    chainId: 31337,
    blockExplorer: '',
    rpcUrl: 'http://' + window.location.hostname + ':9545'
  },
  localOptimism: {
    name: 'localOptimism',
    color: '#f01a37',
    chainId: 420,
    blockExplorer: '',
    rpcUrl: 'http://' + window.location.hostname + ':8545',
    gasPrice: 0
  },
  kovanOptimism: {
    name: 'kovanOptimism',
    color: '#f01a37',
    chainId: 69,
    blockExplorer: 'https://kovan-optimistic.etherscan.io/',
    rpcUrl: 'https://kovan.optimism.io',
    gasPrice: 0
  },
  optimism: {
    name: 'optimism',
    color: '#f01a37',
    chainId: 10,
    blockExplorer: 'https://optimistic.etherscan.io/',
    rpcUrl: 'https://mainnet.optimism.io'
  }
}

export const NETWORK = chainId => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n]
    }
  }
}
