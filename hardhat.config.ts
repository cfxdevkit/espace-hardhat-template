import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";

import "@nomicfoundation/hardhat-ignition-viem";
import "@nomicfoundation/hardhat-toolbox-viem";

import "./tasks"

const deployer_mnemonic = vars.get("DEPLOYER_MNEMONIC")

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,  // Optimize for average number of contract calls
      },
      viaIR: false, // if Enabled IR-based code generation the tests will fail (TODO: fix)
      metadata: {
        bytecodeHash: "none",  // Remove metadata hash from bytecode to ensure consistent deployments
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"], // Enable storage layout for all contracts
        },
      },
    },
  },
  defaultNetwork: "hardhat",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  etherscan: {
    apiKey: {
      confluxESpaceTestnet: "<api-key>",
      confluxESpace: "<api-key>",
    },
    customChains: [
      {
        network: "confluxESpace",
        chainId: 1030,
        urls: {
          apiURL: "https://evmapi.confluxscan.net/api",
          browserURL: "https://evm.confluxscan.io",
        },
      },
      {
        network: "confluxESpaceTestnet",
        chainId: 71,
        urls: {
          apiURL: "https://evmapi-testnet.confluxscan.io/api",
          browserURL: "https://evmtestnet.confluxscan.io",
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
      mining: {
        auto: true,
        interval: 1000,
      },
      gasPrice: "auto",
      gas: "auto",
      allowUnlimitedContractSize: false,  // Enforce contract size limits
    },
    confluxESpaceLocal: {
      url: "http://localhost:8545",
      chainId: 2030,
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
      timeout: 20000,  // 20 seconds
      gasMultiplier: 1.2,  // Add 20% to gas estimation
    },
    confluxESpaceTestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
      timeout: 20000,
      gasMultiplier: 1.2,
    },
    confluxESpace: {
      url: "https://evm.confluxrpc.com",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
      timeout: 20000,
      gasMultiplier: 1.2,
    },
  },
  mocha: {
    timeout: 40000,  // 40 seconds for test timeout
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    excludeContracts: ['contracts/mocks/'],
  },
};

export default config;