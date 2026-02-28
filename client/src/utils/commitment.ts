import { keccak256, encodePacked, toHex } from "viem";

/**
 * Generate commitment hash for commit-reveal privacy
 */
export const generateCommitment = (direction: boolean, salt: `0x${string}`): `0x${string}` => {
  return keccak256(encodePacked(["bool", "bytes32"], [direction, salt]));
};

/**
 * Save salt for later reveal (localStorage)
 */
export const saveBetSalt = (marketId: number, salt: `0x${string}`): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`bet_salt_${marketId}`, salt);
  }
};

/**
 * Get saved salt for reveal
 */
export const getBetSalt = (marketId: number): `0x${string}` | null => {
  if (typeof window === "undefined") return null;
  const salt = localStorage.getItem(`bet_salt_${marketId}`);
  return salt as `0x${string}` | null;
};