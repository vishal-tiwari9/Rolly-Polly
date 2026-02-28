/**
 * Agent Wallet Manager - BNB Version (Commit-Reveal Privacy)
 *
 * Generates ephemeral keypairs per agent in encrypted IndexedDB.
 * Now uses commitment (bytes32) instead of encryptedDirection.
 */

import {
  generatePrivateKey,
  privateKeyToAccount,
  type PrivateKeyAccount,
} from "viem/accounts";
import { createWalletClient, createPublicClient, http } from "viem";
import { bnbTestnet } from "@/config/chains";
import { BELIEF_MARKET_ADDRESS } from "@/config/contracts";
import { BELIEF_MARKET_ABI } from "@/config/beliefMarketAbi";
import { getItem, setItem } from "@/utils/encryptedStore";
import { generateCommitment, saveBetSalt } from "@/utils/commitment";

const WALLET_STORAGE_KEY = "beliefmarket_agent_wallets";

interface StoredWallet {
  agentId: number;
  privateKey: string;
  address: string;
  createdAt: number;
}

// ─── In-memory cache ─────────────────────────────────────────────────
let walletsCache: StoredWallet[] | null = null;
let cacheLoaded = false;

async function ensureCache(): Promise<StoredWallet[]> {
  if (cacheLoaded && walletsCache !== null) return walletsCache;
  try {
    const data = await getItem<StoredWallet[]>(WALLET_STORAGE_KEY);
    walletsCache = data || [];
  } catch {
    walletsCache = [];
  }
  cacheLoaded = true;
  return walletsCache;
}

async function persistWallets(): Promise<void> {
  if (walletsCache) await setItem(WALLET_STORAGE_KEY, walletsCache);
}

// ─── Public API ─────────────────────────────────────────────────────

export async function createAgentWallet(agentId: number): Promise<{
  address: `0x${string}`;
  privateKey: `0x${string}`;
}> {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);

  const wallets = await ensureCache();
  wallets.push({
    agentId,
    privateKey,
    address: account.address,
    createdAt: Date.now(),
  });
  walletsCache = wallets;
  await persistWallets();

  return { address: account.address, privateKey };
}

export async function getAgentWallet(
  agentId: number
): Promise<{ account: PrivateKeyAccount; address: `0x${string}` } | null> {
  const wallets = await ensureCache();
  const stored = wallets.find((w) => w.agentId === agentId);
  if (!stored) return null;

  const account = privateKeyToAccount(stored.privateKey as `0x${string}`);
  return { account, address: account.address };
}

export async function hasAgentWallet(agentId: number): Promise<boolean> {
  const wallets = await ensureCache();
  return wallets.some((w) => w.agentId === agentId);
}

export async function deleteAgentWallet(agentId: number): Promise<void> {
  const wallets = await ensureCache();
  walletsCache = wallets.filter((w) => w.agentId !== agentId);
  await persistWallets();
}

export async function getAgentWalletAddress(agentId: number): Promise<string | null> {
  const wallets = await ensureCache();
  const stored = wallets.find((w) => w.agentId === agentId);
  return stored?.address || null;
}

export async function getAgentWalletPrivateKey(agentId: number): Promise<string | null> {
  const wallets = await ensureCache();
  const stored = wallets.find((w) => w.agentId === agentId);
  return stored?.privateKey || null;
}

export async function ensureAgentWallet(agentId: number): Promise<`0x${string}`> {
  const existing = await getAgentWallet(agentId);
  if (existing) return existing.address;

  const wallet = await createAgentWallet(agentId);
  return wallet.address;
}

// ─── Auto-Execution (BNB + Commitment) ───────────────────────────────

export async function autoExecutePosition(
  agentId: number,
  marketId: number,
  commitment: `0x${string}`,
  deposit: bigint
): Promise<`0x${string}`> {
  let wallet = await getAgentWallet(agentId);
  if (!wallet) {
    const created = await createAgentWallet(agentId);
    const account = privateKeyToAccount(created.privateKey);
    wallet = { account, address: account.address };
  }

  const walletClient = createWalletClient({
    account: wallet.account,
    chain: bnbTestnet,
    transport: http(),
  });

  const publicClient = createPublicClient({
    chain: bnbTestnet,
    transport: http(),
  });

  try {
    const { request } = await publicClient.simulateContract({
      account: wallet.account,
      address: BELIEF_MARKET_ADDRESS,
      abi: BELIEF_MARKET_ABI,
      functionName: "submitPositionForAgent",
      args: [BigInt(agentId), BigInt(marketId), commitment, deposit],
    });

    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[AgentWallet] Auto-execute failed for agent ${agentId}:`, errMsg);
    throw new Error(`Auto-execute failed: ${errMsg.slice(0, 200)}`);
  }
}