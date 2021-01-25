import { getAddress } from '@ethersproject/address'
import { Pool, Token, EthConfigObj } from '~/types'

export const unknownColors: string[] = [
  '#5d6872',
  '#7e9e99',
  '#9d9f7f',
  '#68aca9',
  '#a593a5',
  '#387080',
  '#c7bdf4',
  '#c28d75'
]

export default (token: Token, pool: Pool, ethConfig: EthConfigObj) : Token => {
  token.checksum = getAddress(token.address)
  token.weightPercent = (100 / parseFloat(pool.totalWeight)) * parseFloat(token.denormWeight)
  token.meta = ethConfig.tokens[token.checksum]
  if (token.meta) {
    token.color = token.meta.color
  } else {
    token.color = unknownColors[Math.floor(Math.random() * unknownColors.length)]
  }
  return token
}
