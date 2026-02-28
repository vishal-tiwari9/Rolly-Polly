import { defineChain } from "viem";

export const bnbTestnet = defineChain({
  id: 97,
  name: "BNB Smart Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: {
      http: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan Testnet",
      url: "https://testnet.bscscan.com",
    },
  },
  testnet: true,
});

export const BNB_RPC_URL = "https://data-seed-prebsc-1-s1.bnbchain.org:8545";