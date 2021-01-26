import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { EthConfigObj, Prices, TokenMeta } from '~/types'

const API: string = 'https://api.coingecko.com/api/v3'

interface CoingeckoPrices {
  [key: string]: { usd: number }
}

export interface PricesState {
  all: Prices
}

export const state = () : PricesState => ({
  all: {}
})

export const mutations: MutationTree<PricesState> = {
  setPrices (state: PricesState, prices: Prices) {
    state.all = prices
  }
}

export const actions: ActionTree<PricesState, RootState> = {
  async getAll ({ commit }: ActionContext<PricesState, RootState>) : Promise<void> {
    const { tokens } = this.$ethConfig
    const tokenIds = Object.keys(tokens).map(address => tokens[address].id).filter(id => !!id)
    const prices = await this.$axios.$get(`${API}/simple/price?ids=${tokenIds.join('%2C')}&vs_currencies=usd`)
    commit('setPrices', serialize(prices, this.$ethConfig))
  }
}

function serialize (prices: CoingeckoPrices, ethConfig: EthConfigObj): Prices {
  const serializePrices: Prices = {}
  const idToAdressMap: { [key: string]: string } = {}

  for (const address in ethConfig.tokens) {
    const token: TokenMeta = ethConfig.tokens[address]
    if (!token.id) continue
    idToAdressMap[token.id] = token.address
  }

  for (const id in prices) serializePrices[idToAdressMap[id]] = prices[id].usd

  return serializePrices
}
