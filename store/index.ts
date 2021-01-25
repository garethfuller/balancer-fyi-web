import { MutationTree } from 'vuex'
import { AuthState } from './auth'
import { PoolsState } from './pools'

export interface ModuleTree {
  auth: AuthState,
  pools: PoolsState
}

export interface RootState {
  darkMode: boolean,
}

export const state = () : RootState => ({
  darkMode: true
})

export const mutations: MutationTree<RootState> = {
  setDarkMode (state: RootState, val: boolean) {
    state.darkMode = val
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
  },

  toggleDarkMode (state: RootState) {
    state.darkMode = !state.darkMode
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
  }
}
