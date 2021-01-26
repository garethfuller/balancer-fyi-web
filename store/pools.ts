import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { byLiquidityQuery, byIdsQuery } from '~/lib/subgraph/queries/pools'
import serializePool from '~/lib/subgraph/serializers/pools'
import { Pool } from '~/types'

export interface PoolsState {
  all: Pool[]
}

export const state = () : PoolsState => ({
  all: []
})

export const actions: ActionTree<PoolsState, RootState> = {
  async getAll ({ commit }: ActionContext<PoolsState, RootState>) : Promise<Pool[]> {
    const query = jsonToGraphQLQuery(byLiquidityQuery())
    const { data } = await this.$axios.$post(this.$ethConfig.subgraphUrl, { query })
    const pools = data.pools.map((pool: Pool) => serializePool(pool, this.$ethConfig))
    commit('setPools', pools)
    return pools
  },

  async getByIds ({ commit }: ActionContext<PoolsState, RootState>, ids: string[]) : Promise<Pool[]> {
    const query = jsonToGraphQLQuery(byIdsQuery(ids))
    const { data } = await this.$axios.$post(this.$ethConfig.subgraphUrl, { query })
    const pools = data.pools.map((pool: Pool) => serializePool(pool, this.$ethConfig))
    commit('setPools', pools)
    return pools
  }
}

export const mutations: MutationTree<PoolsState> = {
  setPools (state: PoolsState, pools: Pool[]) {
    state.all = pools
  }
}
