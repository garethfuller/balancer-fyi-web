import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { byUserIdQuery } from '~/lib/subgraph/queries/poolShares'
import { PoolShare } from '~/types'

export interface PoolSharesState {
  all: PoolShare[]
}

export const state = () : PoolSharesState => ({
  all: []
})

export const getters: GetterTree<PoolSharesState, RootState> = {
  balances: state => {
    const balances: Record<string, string> = {}
    state.all.forEach(share => { balances[share.poolId.id] = share.balance })
    return balances
  }
}

export const mutations: MutationTree<PoolSharesState> = {
  setPoolShares (state: PoolSharesState, poolShares: PoolShare[]) {
    state.all = poolShares
  }
}

export const actions: ActionTree<PoolSharesState, RootState> = {
  async getAll ({ commit }: ActionContext<PoolSharesState, RootState>, id: string) : Promise<PoolShare[]> {
    const query = jsonToGraphQLQuery(byUserIdQuery(id))
    const { data } = await this.$axios.$post(this.$ethConfig.subgraphUrl, { query })
    commit('setPoolShares', data.poolShares)
    return data.poolShares
  }
}
