import { Plugin } from '@nuxt/types'
import networkConfigs from './networks'
import { ethConfigObj } from '~/types'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $ethConfig: ethConfigObj
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $ethConfig: ethConfigObj
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $ethConfig: ethConfigObj
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line
  interface Store<S> {
    $ethConfig: ethConfigObj
  }
}

const ethConfig: Plugin = (context, inject) => {
  inject('ethConfig', networkConfigs[context.$config.network])
}

export default ethConfig
