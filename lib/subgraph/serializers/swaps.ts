import { getAddress } from '@ethersproject/address'
import { Prices, Swap } from '~/types'

export default (swap: Swap, prices: Prices) : Swap => {
  swap.amountInUsd = prices[getAddress(swap.tokenIn)] || 0
  swap.amountOutUsd = prices[getAddress(swap.tokenOut)] || 0
  swap.amountChange = swap.amountInUsd - swap.amountOutUsd
  return swap
}
