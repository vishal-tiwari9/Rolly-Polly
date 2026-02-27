// SPDX-License-Identifier: MIT
pragma solidity >=0.8.27;

import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";


//smart-contract\lib\openzeppelin-contracts\contracts\utils\ReentrancyGuard.sol
import {Address} from "../lib/openzeppelin-contracts/contracts/utils/Address.sol";


/**
 * @title Rolly Polly
 * @notice Illiquid, Priceless Private Prediction Markets using BITE v2.
 *
 *         Users submit encrypted positions (YES/NO direction) with USDC stakes.
 *         During the market lifetime, no one can see which side is winning.
 *
 *         Multi-Agent System: Each user can deploy multiple autonomous agents,
 *         each with its own USDC vault, guardrails, system prompt, and optional
 *         delegate address for auto-execution without wallet popups.
 *
 *         At resolution time, BITE v2 CTX decryption reveals all positions
 *         atomically and distributes parimutuel payouts.
 */
contract RollyPolly is  ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Address for address payable;

    // ─── Constants ────────────────────────────────────────────────────
  
    uint256 public constant MAX_POSITIONS_PER_MARKET = 20;
   
    uint256 public constant REFUND_GRACE_PERIOD = 7 days;
    uint256 public constant MAX_AGENTS_PER_USER = 10;

    // Asset type bitmask values
    uint8 public constant ASSET_COMMODITY = 1;  // 0b001
    uint8 public constant ASSET_ETF = 2;        // 0b010
    uint8 public constant ASSET_FX = 4;         // 0b100

    // Personality constants
    uint8 public constant PERSONALITY_CONSERVATIVE = 0;
    uint8 public constant PERSONALITY_BALANCED = 1;
    uint8 public constant PERSONALITY_AGGRESSIVE = 2;
    uint8 public constant PERSONALITY_CONTRARIAN = 3;

    // ─── Immutables ──────────────────────────────────────────────────
    IERC20 public immutable usdc;

    // ─── Enums ───────────────────────────────────────────────────────
    enum MarketStatus {
        OPEN,
        RESOLVING,
        SETTLED,
        CANCELLED
    }

    enum PositionStatus {
        ACTIVE,
        SETTLED,
        CANCELLED,
        REFUNDED
    }

    // ─── Structs ─────────────────────────────────────────────────────

    struct Market {
        address creator;
        uint256 dataSourceId;
        uint256 targetPrice;
        bool conditionAbove;
        uint8 assetType;
        uint256 resolutionTime;
        uint256 totalDeposits;
        uint256 totalPositions;
        MarketStatus status;
        bool outcome;
        uint256 yesPool;
        uint256 noPool;
    }

    struct Position {
        address trader;          // Owner or delegate who submitted
        uint256 agentId;         // 0 = direct user position, >0 = agent position
        uint256 marketId;
        uint256 deposit;
      bytes32 commitment;
        bool direction;
        PositionStatus status;
        uint256 payout;
        
        bool revealed;
      
    }

    struct AgentConfig {
        address owner;              // User who created this agent
        address delegate;           // Browser-generated wallet for auto-execution
        string name;                // Display name
        string systemPrompt;        // Natural-language instructions for behavior
        uint8 personality;          // 0=conservative, 1=balanced, 2=aggressive, 3=contrarian
        uint256 balance;            // USDC vault balance
        uint256 maxBetPerMarket;    // Max USDC per single position
        uint256 maxTotalExposure;   // Max USDC across all active positions
        uint256 currentExposure;    // Running total of active deposits
        uint8 allowedAssetTypes;    // Bitmask of allowed asset types
        uint8 confidenceThreshold;  // 0-100, minimum confidence to act
        bool autoExecute;           // true = auto, false = manual approval
        bool isActive;
    }
