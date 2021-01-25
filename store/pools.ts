import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import queryPayload from '~/lib/subgraph/queries/pools'
import serializePool from '~/lib/subgraph/serializers/pools'
import { Pool } from '~/types'

export interface PoolsState {
  all: Pool[]
}

export const state = () : PoolsState => ({
  all: []
})

export const actions: ActionTree<PoolsState, RootState> = {
  async getAll ({ commit }: ActionContext<PoolsState, RootState>) : Promise<void> {
    const query = jsonToGraphQLQuery(queryPayload())
    const { data } = await this.$axios.$post(this.$ethConfig.subgraphUrl, { query })
    commit('setPools', data.pools.map((pool: Pool) => serializePool(pool, this.$ethConfig)))
  }
}

export const mutations: MutationTree<PoolsState> = {
  setPools (state: PoolsState, pools: Pool[]) {
    state.all = pools
  }
}
