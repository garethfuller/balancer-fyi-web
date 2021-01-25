import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { Prices } from '~/types'

const API: string = 'https://api.coingecko.com/api/v3'

export interface PricesState {
  all: Prices
}

export const state = () : PricesState => ({
  all: {}
})

export const actions: ActionTree<PricesState, RootState> = {
  async getAll ({ commit }: ActionContext<PricesState, RootState>, ids: string[]) : Promise<void> {
    const prices = await this.$axios.$get(`${API}/simple/price?ids=${ids.join('%2C')}&vs_currencies=usd`)
    commit('setPrices', prices)
  }
}

export const mutations: MutationTree<PricesState> = {
  setPrices (state: PricesState, prices: Prices) {
    state.all = prices
  }
}
