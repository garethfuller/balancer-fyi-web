import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { byLiquidityQuery, byIdsQuery } from '~/lib/subgraph/queries/pools'
import serializePool from '~/lib/subgraph/serializers/pools'
import { Pool } from '~/types'

export interface PoolsState {
  all: Pool[],
  favIds: string[],
  loading: boolean
}

export const state = () : PoolsState => ({
  all: [],
  favIds: [],
  loading: false
})

export const mutations: MutationTree<PoolsState> = {
  setPools (state: PoolsState, pools: Pool[]) {
    state.all = pools
  },

  setFavIds (state: PoolsState, ids: string[]) {
    state.favIds = ids
  },

  addPools (state: PoolsState, pools: Pool[]) {
    state.all.push(...pools)
  },

  removePool (state: PoolsState, id: string) {
    const pool = state.all.find(pool => pool.id === id)
    if (pool) {
      const index = state.all.indexOf(pool)
      state.all.splice(index, 1)
    }
  },

  addFav (state: PoolsState, id: string) {
    state.favIds.push(id)
    localStorage.setItem('favPools', JSON.stringify(state.favIds))
  },

  removeFav (state: PoolsState, id: string) {
    const favId = state.favIds.find(f => f === id)
    if (favId) {
      const index = state.favIds.indexOf(favId)
      state.favIds.splice(index, 1)
    }
    localStorage.setItem('favPools', JSON.stringify(state.favIds))
  },

  setLoading (state: PoolsState, val: boolean) {
    state.loading = val
  }
}

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
  },

  async getMore ({ commit }: ActionContext<PoolsState, RootState>, skip: number) : Promise<Pool[]> {
    console.log('fetch more')
    const query = jsonToGraphQLQuery(byLiquidityQuery({ skip, count: 20 }))
    const { data } = await this.$axios.$post(this.$ethConfig.subgraphUrl, { query })
    const pools = data.pools.map((pool: Pool) => serializePool(pool, this.$ethConfig))
    commit('addPools', pools)
    return pools
  }
}
