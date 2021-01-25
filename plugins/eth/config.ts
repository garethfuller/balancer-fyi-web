import { Plugin } from '@nuxt/types'
import networkConfigs from './networks'
import { EthConfigObj } from '~/types'

declare module 'vue/types/vue' {
  // this.$ethConfig inside Vue components
  interface Vue {
    $ethConfig: EthConfigObj
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$ethConfig inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $ethConfig: EthConfigObj
  }
  // nuxtContext.$ethConfig
  interface Context {
    $ethConfig: EthConfigObj
  }
}

declare module 'vuex/types/index' {
  // this.$ethConfig inside Vuex stores
  // eslint-disable-next-line
  interface Store<S> {
    $ethConfig: EthConfigObj
  }
}

const ethConfig: Plugin = (context, inject) => {
  inject('ethConfig', networkConfigs[context.$config.network])
}

export default ethConfig
