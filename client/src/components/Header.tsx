"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useAccount, useBalance, useReadContract, useSwitchChain, useChainId } from "wagmi";
import { formatUnits } from "viem";
import { USDC_ADDRESS, USDC_DECIMALS } from "@/config/contracts";
import { ERC20_ABI } from "@/config/beliefMarketAbi";
import { useAgentContextSafe } from "@/providers/AgentProvider";

const NAV_ITEMS = [
  { href: "/markets", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/agent", label: "Agents" },
  { href: "/history", label: "History" },
];

function truncateAddress(addr: string) {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

// ─── Wallet Dropdown with Chain Switch ───────────────────────────────

function WalletDropdown({
  address,
  onLogout,
}: {
  address: `0x${string}`;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { switchChain } = useSwitchChain();
  const currentChainId = useChainId();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Auto switch to BNB Testnet if not already on it
  useEffect(() => {
    if (currentChainId !== 97 && currentChainId !== undefined) {
      console.log("🔄 Auto-switching to BNB Testnet...");
      switchChain({ chainId: 97 }).catch((err) => {
        console.error("Chain switch failed:", err);
      });
    }
  }, [currentChainId, switchChain]);

  // sFUEL balance (now tBNB on BNB Testnet)
  const { data: nativeBalance } = useBalance({ address });

  // USDC balance
  const { data: usdcRaw } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  const nativeSymbol = currentChainId === 97 ? "tBNB" : "ETH";
  const nativeBalanceFormatted = nativeBalance
    ? Number(formatUnits(nativeBalance.value, 18)).toFixed(4)
    : "—";

  const usdc = usdcRaw !== undefined
    ? Number(formatUnits(usdcRaw as bigint, USDC_DECIMALS)).toFixed(2)
    : "—";

  function handleCopy() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleSwitchToBNB() {
    switchChain({ chainId: 97 });
  }

  const isOnBNB = currentChainId === 97;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: 10,
          cursor: "pointer",
          background: "var(--bg-raised)",
          border: open
            ? "1px solid rgba(167, 111, 250, 0.3)"
            : "1px solid var(--border)",
          transition: "all 200ms",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: isOnBNB ? "#34d399" : "#ef4444",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontFamily: "var(--font-mono), monospace",
            color: "var(--text-secondary)",
          }}
        >
          {truncateAddress(address)}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 300,
            background: "var(--bg-raised)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 0,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          {/* Address row */}
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)" }}>
                Connected Wallet
              </span>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: isOnBNB ? "#34d399" : "#ef4444" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontFamily: "var(--font-mono), monospace", color: "var(--text-primary)", flex: 1 }}>
                {truncateAddress(address)}
              </span>
              <button onClick={handleCopy} style={{ padding: "4px 8px", borderRadius: 6, cursor: "pointer", fontSize: 11, background: copied ? "rgba(52,211,153,0.1)" : "transparent", color: copied ? "#34d399" : "#A76FFA" }}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Network Status */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Network</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: isOnBNB ? "#34d399" : "#ef4444" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: isOnBNB ? "#34d399" : "#ef4444" }}>
                {isOnBNB ? "BNB Smart Chain Testnet" : "Ethereum"}
              </span>
            </div>

            {!isOnBNB && (
              <button
                onClick={handleSwitchToBNB}
                style={{
                  marginTop: 8,
                  width: "100%",
                  padding: "8px",
                  borderRadius: 8,
                  background: "#A76FFA",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Switch to BNB Testnet
              </button>
            )}
          </div>

          {/* Balances */}
          <div style={{ padding: "12px 16px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>Balances</div>

            {/* USDC */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span>USDC</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{usdc}</span>
            </div>

            {/* Native Token */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
              <span>{nativeSymbol}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{nativeBalanceFormatted}</span>
            </div>
          </div>

          {/* Disconnect */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                background: "rgba(239,68,68,0.1)",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.2)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();
  const { ready, authenticated, logout } = usePrivy();
  const { login } = useLogin();
  const { address } = useAccount();
  const agentCtx = useAgentContextSafe();
  const pendingCount = agentCtx?.pendingApprovalCount || 0;

  if (pathname === "/") return null;

  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left: Logo + Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
              Rolly <span style={{ color: "#A76FFA" }}>Polly</span>
            </span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "6px 14px",
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    textDecoration: "none",
                    borderRadius: 8,
                    background: isActive ? "rgba(167, 111, 250, 0.06)" : "transparent",
                    border: isActive ? "1px solid rgba(167, 111, 250, 0.15)" : "1px solid transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Wallet */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!ready ? (
            <div style={{ padding: "8px 16px", color: "var(--text-muted)" }}>Loading...</div>
          ) : authenticated && address ? (
            <WalletDropdown address={address} onLogout={logout} />
          ) : (
            <button
              onClick={() => login()}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                background: "#A76FFA",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}