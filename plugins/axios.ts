import { Plugin } from '@nuxt/types'

const axiosPlugin: Plugin = context => {
  context.$axios.defaults.baseURL = context.$config.API_URL
}

export default axiosPlugin
