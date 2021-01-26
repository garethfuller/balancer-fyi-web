<template>
  <div class="default-container">
    <TopNav />
    <div class="flex">
      <SideNav class="w-1/3 md:w-1/5 lg:w-1/6 hidden md:block" />
      <Nuxt v-if="!loading" class="flex-1 pr-4 pl-4 md:pl-0" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import TopNav from '~/components/navs/TopNav.vue'
import SideNav from '~/components/navs/SideNav.vue'

export default Vue.extend({
  components: {
    TopNav,
    SideNav
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
<style>
.default-container {
  @apply bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 min-h-screen;
}
</style>
