export const BELIEF_MARKET_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "_usdc", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "stateMutability": "payable", "type": "fallback" },
  { "stateMutability": "payable", "type": "receive" },
  {
    "inputs": [],
    "name": "ASSET_COMMODITY",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ASSET_ETF",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ASSET_FX",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_AGENTS_PER_USER",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_POSITIONS_PER_MARKET",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PERSONALITY_AGGRESSIVE",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PERSONALITY_BALANCED",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PERSONALITY_CONSERVATIVE",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PERSONALITY_CONTRARIAN",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "REFUND_GRACE_PERIOD",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
    "name": "activateAgent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "agentPositionIds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "agents",
    "outputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "delegate", "type": "address" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "systemPrompt", "type": "string" },
      { "internalType": "uint8", "name": "personality", "type": "uint8" },
      { "internalType": "uint256", "name": "balance", "type": "uint256" },
      { "internalType": "uint256", "name": "maxBetPerMarket", "type": "uint256" },
      { "internalType": "uint256", "name": "maxTotalExposure", "type": "uint256" },
      { "internalType": "uint256", "name": "currentExposure", "type": "uint256" },
      { "internalType": "uint8", "name": "allowedAssetTypes", "type": "uint8" },
      { "internalType": "uint8", "name": "confidenceThreshold", "type": "uint8" },
      { "internalType": "bool", "name": "autoExecute", "type": "bool" },
      { "internalType": "bool", "name": "isActive", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_positionId", "type": "uint256" }],
    "name": "cancelPosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_marketId", "type": "uint256" }],
    "name": "claimRefund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_systemPrompt", "type": "string" },
      { "internalType": "uint8", "name": "_personality", "type": "uint8" },
      { "internalType": "address", "name": "_delegate", "type": "address" },
      { "internalType": "uint256", "name": "_maxBetPerMarket", "type": "uint256" },
      { "internalType": "uint256", "name": "_maxTotalExposure", "type": "uint256" },
      { "internalType": "uint8", "name": "_allowedAssetTypes", "type": "uint8" },
      { "internalType": "uint8", "name": "_confidenceThreshold", "type": "uint8" },
      { "internalType": "bool", "name": "_autoExecute", "type": "bool" }
    ],
    "name": "createAgent",
    "outputs": [{ "internalType": "uint256", "name": "agentId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_dataSourceId", "type": "uint256" },
      { "internalType": "uint256", "name": "_targetPrice", "type": "uint256" },
      { "internalType": "bool", "name": "_conditionAbove", "type": "bool" },
      { "internalType": "uint8", "name": "_assetType", "type": "uint8" },
      { "internalType": "uint256", "name": "_resolutionTime", "type": "uint256" }
    ],
    "name": "createMarket",
    "outputs": [{ "internalType": "uint256", "name": "marketId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
    "name": "deactivateAgent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "delegateToAgentId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_agentId", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "fundAgent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
    "name": "getAgent",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "address", "name": "delegate", "type": "address" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "systemPrompt", "type": "string" },
          { "internalType": "uint8", "name": "personality", "type": "uint8" },
          { "internalType": "uint256", "name": "balance", "type": "uint256" },
          { "internalType": "uint256", "name": "maxBetPerMarket", "type": "uint256" },
          { "internalType": "uint256", "name": "maxTotalExposure", "type": "uint256" },
          { "internalType": "uint256", "name": "currentExposure", "type": "uint256" },
          { "internalType": "uint8", "name": "allowedAssetTypes", "type": "uint8" },
          { "internalType": "uint8", "name": "confidenceThreshold", "type": "uint8" },
          { "internalType": "bool", "name": "autoExecute", "type": "bool" },
          { "internalType": "bool", "name": "isActive", "type": "bool" }
        ],
        "internalType": "struct BeliefMarket.AgentConfig",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAgentCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
    "name": "getAgentPositionIds",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_marketId", "type": "uint256" }],
    "name": "getMarket",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "creator", "type": "address" },
          { "internalType": "uint256", "name": "dataSourceId", "type": "uint256" },
          { "internalType": "uint256", "name": "targetPrice", "type": "uint256" },
          { "internalType": "bool", "name": "conditionAbove", "type": "bool" },
          { "internalType": "uint8", "name": "assetType", "type": "uint8" },
          { "internalType": "uint256", "name": "resolutionTime", "type": "uint256" },
          { "internalType": "uint256", "name": "totalDeposits", "type": "uint256" },
          { "internalType": "uint256", "name": "totalPositions", "type": "uint256" },
          { "internalType": "enum BeliefMarket.MarketStatus", "name": "status", "type": "uint8" },
          { "internalType": "bool", "name": "outcome", "type": "bool" },
          { "internalType": "uint256", "name": "yesPool", "type": "uint256" },
          { "internalType": "uint256", "name": "noPool", "type": "uint256" }
        ],
        "internalType": "struct BeliefMarket.Market",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMarketCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_marketId", "type": "uint256" }],
    "name": "getMarketPositionIds",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }],
    "name": "getOwnerAgentIds",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_positionId", "type": "uint256" }],
    "name": "getPosition",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "trader", "type": "address" },
          { "internalType": "uint256", "name": "agentId", "type": "uint256" },
          { "internalType": "uint256", "name": "marketId", "type": "uint256" },
          { "internalType": "uint256", "name": "deposit", "type": "uint256" },
          { "internalType": "bytes32", "name": "commitment", "type": "bytes32" },
          { "internalType": "bool", "name": "direction", "type": "bool" },
          { "internalType": "enum BeliefMarket.PositionStatus", "name": "status", "type": "uint8" },
          { "internalType": "uint256", "name": "payout", "type": "uint256" },
          { "internalType": "bool", "name": "revealed", "type": "bool" }
        ],
        "internalType": "struct BeliefMarket.Position",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "getUserPositionIds",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "marketPositionIds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "markets",
    "outputs": [
      { "internalType": "address", "name": "creator", "type": "address" },
      { "internalType": "uint256", "name": "dataSourceId", "type": "uint256" },
      { "internalType": "uint256", "name": "targetPrice", "type": "uint256" },
      { "internalType": "bool", "name": "conditionAbove", "type": "bool" },
      { "internalType": "uint8", "name": "assetType", "type": "uint8" },
      { "internalType": "uint256", "name": "resolutionTime", "type": "uint256" },
      { "internalType": "uint256", "name": "totalDeposits", "type": "uint256" },
      { "internalType": "uint256", "name": "totalPositions", "type": "uint256" },
      { "internalType": "enum BeliefMarket.MarketStatus", "name": "status", "type": "uint8" },
      { "internalType": "bool", "name": "outcome", "type": "bool" },
      { "internalType": "uint256", "name": "yesPool", "type": "uint256" },
      { "internalType": "uint256", "name": "noPool", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextAgentId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextMarketId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextPositionId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "ownerAgentIds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "positions",
    "outputs": [
      { "internalType": "address", "name": "trader", "type": "address" },
      { "internalType": "uint256", "name": "agentId", "type": "uint256" },
      { "internalType": "uint256", "name": "marketId", "type": "uint256" },
      { "internalType": "uint256", "name": "deposit", "type": "uint256" },
      { "internalType": "bytes32", "name": "commitment", "type": "bytes32" },
      { "internalType": "bool", "name": "direction", "type": "bool" },
      { "internalType": "enum BeliefMarket.PositionStatus", "name": "status", "type": "uint8" },
      { "internalType": "uint256", "name": "payout", "type": "uint256" },
      { "internalType": "bool", "name": "revealed", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_marketId", "type": "uint256" },
      { "internalType": "bool", "name": "_outcome", "type": "bool" }
    ],
    "name": "resolveMarket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_positionId", "type": "uint256" },
      { "internalType": "bool", "name": "_direction", "type": "bool" },
      { "internalType": "bytes32", "name": "_salt", "type": "bytes32" }
    ],
    "name": "revealPosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_marketId", "type": "uint256" },
      { "internalType": "bytes32", "name": "_commitment", "type": "bytes32" },
      { "internalType": "uint256", "name": "_deposit", "type": "uint256" }
    ],
    "name": "submitPosition",
    "outputs": [{ "internalType": "uint256", "name": "positionId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_agentId", "type": "uint256" },
      { "internalType": "uint256", "name": "_marketId", "type": "uint256" },
      { "internalType": "bytes32", "name": "_commitment", "type": "bytes32" },
      { "internalType": "uint256", "name": "_deposit", "type": "uint256" }
    ],
    "name": "submitPositionForAgent",
    "outputs": [{ "internalType": "uint256", "name": "positionId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_agentId", "type": "uint256" },
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_systemPrompt", "type": "string" },
      { "internalType": "uint8", "name": "_personality", "type": "uint8" },
      { "internalType": "address", "name": "_delegate", "type": "address" },
      { "internalType": "uint256", "name": "_maxBetPerMarket", "type": "uint256" },
      { "internalType": "uint256", "name": "_maxTotalExposure", "type": "uint256" },
      { "internalType": "uint8", "name": "_allowedAssetTypes", "type": "uint8" },
      { "internalType": "uint8", "name": "_confidenceThreshold", "type": "uint8" },
      { "internalType": "bool", "name": "_autoExecute", "type": "bool" }
    ],
    "name": "updateAgent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "usdc",
    "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "userPositionIds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_agentId", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "withdrawFromAgent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
export const ERC20_ABI = [
  {
    inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
