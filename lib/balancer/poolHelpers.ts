import BigNumber from '~/lib/bignumber'
import { Pool, Prices } from '~/types'

export function liquidityFor (pool: Pool, prices: Prices) : string {
  let sumWeight = new BigNumber(0)
  let sumValue = new BigNumber(0)

  for (const token of pool.tokens) {
    const price = prices[token.checksum]
    if (!price) continue

    const balanceNumber = new BigNumber(token.balance)
    const value = balanceNumber.times(price)
    sumValue = sumValue.plus(value)
    sumWeight = sumWeight.plus(token.weightPercent / 100)
  }
  if (sumWeight.gt(0)) {
    return sumValue.div(sumWeight).toString()
  } else {
    return pool.liquidity
  }
}

export function recentSwapVolumeFor (pool: Pool) : number {
  const volumeBeforeYesterday = (pool.swaps && pool.swaps[0] && pool.swaps[0].poolTotalSwapVolume)
    ? parseFloat(pool.swaps[0].poolTotalSwapVolume)
    : 0

  return parseFloat(pool.totalSwapVolume) - volumeBeforeYesterday
}
