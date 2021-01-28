import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { RootState } from './index'
import serializeSwap from '~/lib/subgraph/serializers/swaps'
import { last24hQuery } from '~/lib/subgraph/queries/swaps'
import { Prices, Swap } from '~/types'

export interface SwapsState {
  all: Swap[]
}

export const state = () : SwapsState => ({
  all: []
})

export const getters: GetterTree<SwapsState, RootState> = {
  poolIdsByAmountIn: state => {
    const uniquePoolIds: string[] = [...new Set(state.all.map(swap => swap.poolAddress.id))]
    const amountChangeForPools: Array<[string, number]> = []

    uniquePoolIds.forEach(id => {
      const totalAmountChange = state.all
        .filter(swap => swap.poolAddress.id === id)
        .map(swap => swap.amountChange)
        .reduce((a, b) => a + b, 0)

      if (totalAmountChange > 0) amountChangeForPools.push([id, totalAmountChange])
    })

    return amountChangeForPools.sort((a, b) => b[1] - a[1]).map(pool => pool[0])
  }
}

export const mutations: MutationTree<SwapsState> = {
  setAll (state: SwapsState, swaps: Swap[]) {
    state.all = swaps
  }
}

export const actions: ActionTree<SwapsState, RootState> = {
  async getLast24h ({ commit }: ActionContext<SwapsState, RootState>, prices: Prices) : Promise<Swap[]> {
    const query = jsonToGraphQLQuery(last24hQuery())
    const { data } = await this.$axios.$post(this.$ethConfig.subgraphUrl, { query })
    const swaps = data.swaps.map((swap: Swap) => serializeSwap(swap, prices))
    commit('setAll', swaps)
    return swaps
  }
}
