"use client";

import { useEffect } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config/wagmi";
import { bnbTestnet } from "@/config/chains";
import { AgentProvider } from "@/providers/AgentProvider";
import { useSwitchChain, useChainId } from "wagmi";

const queryClient = new QueryClient();

// 🔥 Inner Component (WagmiProvider ke ANDAR hona zaroori hai)
function ChainSwitcher() {
  const { switchChain } = useSwitchChain();
  const currentChainId = useChainId();

  useEffect(() => {
    if (currentChainId !== 97) {
      console.log("🔄 Auto-switching to BNB Testnet (Chain 97)...");
      switchChain({ chainId: 97 }).catch((err) => {
        console.error("❌ Chain switch failed:", err);
      });
    } else {
      console.log("✅ Already on BNB Testnet (Chain 97)");
    }
  }, [currentChainId, switchChain]);

  return null; // Yeh sirf side-effect ke liye hai
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
          padding: 24,
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-primary)", fontSize: 16 }}>
          Privy is not configured. Add <code>NEXT_PUBLIC_PRIVY_APP_ID</code> to your
          .env file.
        </p>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        defaultChain: bnbTestnet,
        supportedChains: [bnbTestnet],
        loginMethods: ["wallet", "email", "sms", "google", "apple"],
        appearance: { theme: "dark", accentColor: "#A76FFA" },
        embeddedWallets: {
          ethereum: { createOnLogin: "users-without-wallets" },
          showWalletUIs: true,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {/* 🔥 Yeh component WagmiProvider ke andar hai */}
          <ChainSwitcher />
          <AgentProvider>{children}</AgentProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}