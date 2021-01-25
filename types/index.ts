export interface ConfigEnv {
  network: string
}

export interface Token {
  id: string,
  address: string,
  balance: string,
  checksum: string,
  decimals: number,
  denormWeight: string,
  symbol: string,
  weightPercent: number
  meta: object
}

export interface Swap {
  poolTotalSwapVolume: string
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

export interface Price {
  usd: number,
}

export interface Prices {
  [key: string]: Price
}

export interface ethConfigTokenMeta {
  id: string
}

export interface ethConfigTokens {
  [key: string]: ethConfigTokenMeta
}

export interface ethConfigRegistry {
  tokens: ethConfigTokens
}

export interface ethConfigObj {
  network: string,
  chainId: number,
  defaultPrecision: number,
  rpcUrl: string,
  wsUrl: string,
  subgraphUrl: string,
  explorer: string,
  addresses: object,
  tokens: ethConfigTokens
}
