import smartPools from '@balancer-labs/assets/data/pools.json'

const now = Math.round(new Date().getTime() / 1000)
const tsYesterday = now - 24 * 3600
// @ts-ignore
const smartPoolIds = Object.entries(smartPools).filter(crp => crp[1].is_compatible).map(crp => crp[0].toLowerCase())

export type PoolArgs = {
  where: {
    active?: boolean,
    tokensCount_gt?: number,
    finalized?: boolean
    crp?: boolean,
    id_in?: string[]
  },
  first: number,
  skip: number,
  orderBy: string,
  orderDirection: string
}

export const defaultArgs: PoolArgs = {
  where: {
    active: true,
    tokensCount_gt: 1,
    finalized: true
  },
  first: 20,
  skip: 0,
  orderBy: 'liquidity',
  orderDirection: 'desc'
}

export const argsFor = (type: string = 'shared') : PoolArgs => {
  switch (type) {
    case 'shared':
      return defaultArgs
    case 'smart':
      return Object.assign({}, defaultArgs, {
        where: {
          active: true,
          tokensCount_gt: 1,
          id_in: smartPoolIds
        }
      })
    case 'private':
      return Object.assign({}, defaultArgs, {
        where: {
          active: true,
          tokensCount_gt: 1,
          finalized: false,
          crp: false
        }
      })
    default:
      throw new Error('Arg type not handled')
  }
}

export default (args: PoolArgs) : Object => ({
  query: {
    pools: {
      __args: args,
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
