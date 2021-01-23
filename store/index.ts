import { MutationTree } from 'vuex'

export const state = () => ({
  darkMode: true
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setDarkMode (state, val: boolean) {
    state.darkMode = val
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
  },

  toggleDarkMode (state) {
    state.darkMode = !state.darkMode
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
  }
}
