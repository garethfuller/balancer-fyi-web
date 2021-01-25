const now = Math.round(new Date().getTime() / 1000)
const tsYesterday = now - 24 * 3600

type Options = {
  count: number
}

export default (options: Options = { count: 20 }) : object => ({
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
        skip: 0,
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
