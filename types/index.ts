export interface ConfigEnv {
  network: string
}

export interface TokenMeta {
  id: string,
  color: string,
  address: string
}

export interface Token {
  id: string,
  address: string,
  balance: string,
  checksum: string,
  decimals: number,
  denormWeight: string,
  symbol: string,
  weightPercent: number,
  color: string,
  meta: TokenMeta
}

export interface Swap {
  poolAddress: { id: string },
  poolTotalSwapVolume: string,
  tokenIn: string,
  tokenOut: string,
  tokenAmountIn: string,
  tokenAmountOut: string,
  timestamp: number,
  amountInUsd: number,
  amountOutUsd: number,
  amountChange: number
}

export interface Pool {
  id: string,
  crp: boolean,
  finalized: boolean,
  liquidity: string,
  publicSwap: boolean,
  swapFee: string,
  swaps: Swap[],
  swapsCount: string,
  tokensList: string[],
  totalShares: string,
  totalSwapVolume: string,
  totalWeight: string,
  recentSwapVolume: number,
  tokens: Token[]
}

export interface PoolShare {
  id: string,
  balance: string,
  userAddress: { id: string },
  poolId: { id: string }
}

export interface Prices {
  [key: string]: number
}

export interface EthConfigTokens {
  [key: string]: TokenMeta
}

export interface EthConfigRegistry {
  tokens: EthConfigTokens
}

export interface EthConfigObj {
  network: string,
  chainId: number,
  defaultPrecision: number,
  rpcUrl: string,
  wsUrl: string,
  subgraphUrl: string,
  explorer: string,
  addresses: {
    bFactory: string,
    bActions: string,
    dsProxyRegistry: string,
    proxy: string,
    crpFactory: string,
    weth: string,
    multicall: string
  },
  tokens: EthConfigTokens
}

export interface EthConfigNetworks {
  [key: string]: EthConfigObj
}
