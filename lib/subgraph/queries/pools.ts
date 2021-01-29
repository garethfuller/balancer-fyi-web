const now = Math.round(new Date().getTime() / 1000)
const tsYesterday = now - 24 * 3600

type Options = {
  count?: number,
  skip?: number
}

export const byLiquidityQuery = (options: Options = { count: 20, skip: 0 }) : object => ({
  query: {
    pools: {
      __args: {
        where: {
          active: true,
          tokensCount_gt: 1,
          finalized: true,
          tokensList_not: []
        },
        first: options.count,
        skip: options.skip,
        orderBy: 'liquidity',
        orderDirection: 'desc'
      },
      id: true,
      publicSwap: true,
      finalized: true,
      crp: true,
      rights: true,
      swapFee: true,
      totalWeight: true,
      totalShares: true,
      totalSwapVolume: true,
      liquidity: true,
      tokensList: true,
      swapsCount: true,
      tokens: {
        __args: {
          orderBy: 'denormWeight',
          orderDirection: 'desc'
        },
        id: true,
        address: true,
        balance: true,
        decimals: true,
        symbol: true,
        denormWeight: true
      },
      swaps: {
        __args: {
          first: 1,
          orderBy: 'timestamp',
          orderDirection: 'desc',
          where: {
            timestamp_lt: tsYesterday
          }
        },
        poolTotalSwapVolume: true
      }
    }
  }
})

export const byIdsQuery = (ids: string[], options: Options = { count: 100 }) : object => ({
  query: {
    pools: {
      __args: {
        where: {
          active: true,
          tokensCount_gt: 1,
          finalized: true,
          tokensList_not: [],
          id_in: ids
        },
        first: options.count,
        skip: 0
      },
      id: true,
      publicSwap: true,
      finalized: true,
      crp: true,
      rights: true,
      swapFee: true,
      totalWeight: true,
      totalShares: true,
      totalSwapVolume: true,
      liquidity: true,
      tokensList: true,
      swapsCount: true,
      tokens: {
        __args: {
          orderBy: 'denormWeight',
          orderDirection: 'desc'
        },
        id: true,
        address: true,
        balance: true,
        decimals: true,
        symbol: true,
        denormWeight: true
      },
      swaps: {
        __args: {
          first: 1,
          orderBy: 'timestamp',
          orderDirection: 'desc',
          where: {
            timestamp_lt: tsYesterday
          }
        },
        poolTotalSwapVolume: true
      }
    }
  }
})

export const byControllerQuery = (proxyAddress: string) : object => ({
  query: {
    pools: {
      __args: {
        where: {
          crpController: proxyAddress
        }
      },
      id: true,
      publicSwap: true,
      finalized: true,
      crp: true,
      rights: true,
      swapFee: true,
      totalWeight: true,
      totalShares: true,
      totalSwapVolume: true,
      liquidity: true,
      tokensList: true,
      swapsCount: true,
      tokens: {
        __args: {
          orderBy: 'denormWeight',
          orderDirection: 'desc'
        },
        id: true,
        address: true,
        balance: true,
        decimals: true,
        symbol: true,
        denormWeight: true
      },
      swaps: {
        __args: {
          first: 1,
          orderBy: 'timestamp',
          orderDirection: 'desc',
          where: {
            timestamp_lt: tsYesterday
          }
        },
        poolTotalSwapVolume: true
      }
    }
  }
})
