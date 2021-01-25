<template>
  <div
    class="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 min-h-screen"
  >
    <AppNav />
    <Nuxt v-if="!loading" />
    <AppFooter />
  </div>
</template>
<script lang="ts">
import { mapActions } from 'vuex'
import AppNav from '~/components/navs/AppNav.vue'
import AppFooter from '~/components/navs/AppFooter.vue'

export default {
  components: {
    AppNav,
    AppFooter
  },

  data () {
    return {
      loading: true
    }
  },

  head: {
    bodyAttrs: {
      class: 'dark min-h-screen'
    }
  },

  async beforeMount () {
    try {
      const { tokens } = this.$ethConfig
      const tokenIds = Object.keys(tokens)
        .map(address => tokens[address].id)
        .filter(id => !!id)
      await this.getPrices(tokenIds)
      this.loading = false
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    ...mapActions({
      getPrices: 'prices/getAll'
    })
  }
}
</script>
<style></style>
