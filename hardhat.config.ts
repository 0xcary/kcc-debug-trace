import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-tracer";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    hardhat: {
      forking:{
        url: "https://rpc-mainnet.kcc.network",
        enabled: true,
        blockNumber: 11524969 // change this to the block number of your tx
      },
      chainId: 321,
      hardfork: "berlin"
    },
  }
};

export default config;