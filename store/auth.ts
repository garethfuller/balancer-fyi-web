import { ethers } from 'ethers'
import { getAddress } from '@ethersproject/address'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from './index'
import DSProxyRegistry from '~/lib/contracts/abis/DSProxyRegistry.json'

export interface AuthState {
  provider?: Web3Provider,
  signer?: Signer,
  address: string,
  ensName: string,
  proxy: string,
  showDialog: boolean,
  connecting: boolean
}

export const state = () : AuthState => ({
  address: '',
  ensName: '',
  proxy: '',
  showDialog: false,
  connecting: false
})

export const getters: GetterTree<AuthState, RootState> = {
  isConnected: state => !!state.address
}

export const mutations: MutationTree<AuthState> = {
  setProvider (state: AuthState, provider: Web3Provider) {
    state.provider = provider
  },

  setSigner (state: AuthState, signer: Signer) {
    state.signer = signer
  },

  setAddress (state: AuthState, address: string) {
    state.address = getAddress(address)
  },

  setEnsName (state: AuthState, name: string) {
    state.ensName = name
  },

  setProxy (state: AuthState, proxy: string) {
    state.proxy = proxy
  },

  setShowDialog (state: AuthState, val: boolean) {
    state.showDialog = val
  },

  setConnecting (state: AuthState, val: boolean) {
    state.connecting = val
  }
}

export const actions: ActionTree<AuthState, RootState> = {
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
    const address = getAddress(await state.provider.resolveName(name))
    if (address === state.address) commit('setEnsName', name)
  },

  async getProxy ({ commit, state }: ActionContext<AuthState, RootState>) : Promise<void> {
    if (!state.provider) return
    const dsProxyRegistryContract = new Contract(
      this.$ethConfig.addresses.dsProxyRegistry,
      DSProxyRegistry.abi,
      state.provider
    )
    const proxy = await dsProxyRegistryContract.proxies(state.address)
    commit('setProxy', proxy)
  }
}
