import { getAddress } from '@ethersproject/address'
import serializeToken from './tokens'
import { Pool, EthConfigObj } from '~/types'
import { recentSwapVolumeFor } from '~/lib/balancer/poolHelpers'

export default (pool: Pool, ethConfig: EthConfigObj) : Pool => {
  pool.tokens = pool.tokens.map(token => serializeToken(token, pool, ethConfig))
  pool.tokensList = pool.tokensList.map(token => getAddress(token))
  pool.recentSwapVolume = recentSwapVolumeFor(pool)
  return pool
}
