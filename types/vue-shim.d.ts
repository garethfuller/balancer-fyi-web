import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
  }
}
