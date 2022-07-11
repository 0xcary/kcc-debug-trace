# How to trace a transaction on KCC mainnet 

Although the official KCC RPC does not enable `debug_traceTransaction` calls, you can still trace your transaction with this trick. 

## Warning!!! 

When you trace a transaction, hardhat will make a lot of RPC requests for the historical states, and you may be temporarily blocked by the official RPC!! (An error with "too many requests"). 

## Step1: Change the hardhat config file 

Change the "blockNumber" field to the block number of your TX:

```typescript 
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    hardhat: {
      forking:{
        url: "https://rpc-mainnet.kcc.network",
        enabled: true,
        blockNumber: 11659461 // change this to the block number of your tx
      },
      chainId: 321,
      hardfork: "berlin"
    },
  }
};
```


## Step2: Trace your transaction 

Replace `0x2e771217f8b06021f56dd77561102cd5a0ceb0bdb0e6c5baa481a0df090f5b22` with your own transaction hash: 

```
npx hardhat trace --hash 0x2e771217f8b06021f56dd77561102cd5a0ceb0bdb0e6c5baa481a0df090f5b22
```


And the expected output is : 

```c++
Switched mainnet fork to block 11659461
CALL UnknownContractAndFunction(to=0x0cc7fb3626c55ce4eff79045e8e7cb52434431d4, input=0xe2bbb15800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000, ret=0x)
   STATICCALL UnknownContractAndFunction(to=0x1ee6b0f7302b3c48c5fa89cd0a066309d9ac3584, input=0x70a082310000000000000000000000000cc7fb3626c55ce4eff79045e8e7cb52434431d4, ret=0x0000000000000000000000000000000000000000000006ecf55335f9a80a5156)
   CALL UnknownContractAndFunction(to=0x4a81704d8c16d9fb0d7f61b747d0b5a272badf14, input=0x40c10f190000000000000000000000000cc7fb3626c55ce4eff79045e8e7cb52434431d400000000000000000000000000000000000000000001a13f437f920ea8e40000, ret=0x08c379a000000000000000000000000000000000000000000000000000000000)
      REVERT Error(reason="caller is not the minter")
   REVERT Error(reason="caller is not the minter")
```