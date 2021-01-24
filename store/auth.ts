import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { ActionContext } from 'vuex'
import { RootState } from './index'

export interface AuthState {
  provider?: Web3Provider | undefined,
  signer?: Signer | undefined,
  address: string,
  ensName: string
}

export const state = () : AuthState => ({
  address: '',
  ensName: ''
})

export const actions = {
  getProvider ({ commit }: ActionContext<AuthState, RootState>) : void {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    commit('setProvider', provider)
  },

  async getSigner ({ commit, state }: ActionContext<AuthState, RootState>) : Promise<void> {
    if (!state.provider) return
    const signer = await state.provider.getSigner()
    commit('setSigner', signer)
  },

  async getAddress ({ commit, state }: ActionContext<AuthState, RootState>) : Promise<void> {
    if (!state.signer) return
    const address = await state.signer.getAddress()
    commit('setAddress', address)
  },

  async getEnsName ({ commit, state }: ActionContext<AuthState, RootState>) : Promise<void> {
    if (!state.provider) return
    const name = await state.provider.lookupAddress(state.address)
    const address = await state.provider.resolveName(name)
    if (address === state.address) commit('setEnsName', name)
  }
}

export const mutations = {
  setProvider (state: AuthState, provider: Web3Provider) {
    state.provider = provider
  },

  setSigner (state: AuthState, signer: Signer) {
    state.signer = signer
  },

  setAddress (state: AuthState, address: string) {
    state.address = address
  },

  setEnsName (state: AuthState, name: string) {
    state.ensName = name
  }
}
