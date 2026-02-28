"use client";

import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { bnbTestnet } from "./chains";

export const config = createConfig({
  chains: [bnbTestnet],
  transports: {
    [bnbTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}