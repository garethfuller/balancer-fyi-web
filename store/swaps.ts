import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { latestQuery } from '~/lib/subgraph/queries/swaps'
import { Swap } from '~/types'

export interface SwapsState {
  all: Swap[]
}

export const state = () : SwapsState => ({
  all: []
})

export const mutations: MutationTree<SwapsState> = {
  setSwaps (state: SwapsState, swaps: Swap[]) {
    state.all = swaps
  }
}

export const actions: ActionTree<SwapsState, RootState> = {
  async getLatest ({ commit }: ActionContext<SwapsState, RootState>, count: number) : Promise<Swap[]> {
    const query = jsonToGraphQLQuery(latestQuery({ count }))
    const { data } = await this.$axios.$post(this.$ethConfig.subgraphUrl, { query })
    commit('setSwaps', data.swaps)
    return data.swaps
  }
}
