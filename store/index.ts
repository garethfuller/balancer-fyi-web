import { AuthState } from './auth'

export interface ModuleTree {
  auth: AuthState
}

export interface RootState {
  darkMode: boolean,
}

export const state = () : RootState => ({
  darkMode: true
})

export const mutations = {
  setDarkMode (state: RootState, val: boolean) {
    state.darkMode = val
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
  },

  toggleDarkMode (state: RootState) {
    state.darkMode = !state.darkMode
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
  }
}
