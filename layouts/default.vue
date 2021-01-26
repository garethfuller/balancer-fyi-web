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
import Vue from 'vue'
import { mapActions } from 'vuex'
import AppNav from '~/components/navs/AppNav.vue'
import AppFooter from '~/components/navs/AppFooter.vue'

export default Vue.extend({
  components: {
    AppNav,
    AppFooter
  },

  data () {
    return {
      loading: true
    }
  },

  async beforeMount () {
    try {
      await this.getPrices()
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
})
</script>
<style></style>
