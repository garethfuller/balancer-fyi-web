<template>
  <div class="default-container">
    <div class="flex">
      <div class="w-1/3 md:w-1/5 lg:w-1/6 hidden md:block">
        <div class="h-20 px-4 flex items-center">
          <nuxt-link to="/">
            <AppLogo />
          </nuxt-link>
        </div>
        <SideNav class="sticky top-0" />
      </div>
      <div class="flex-1 pr-4 pl-4 md:pl-0">
        <TopNav />
        <Nuxt v-if="!loading" class="" />
      </div>
    </div>
    <WalletDialog />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
import TopNav from '~/components/navs/TopNav.vue'
import SideNav from '~/components/navs/SideNav.vue'
import AppLogo from '~/components/images/AppLogo.vue'
import WalletDialog from '~/components/dialogs/WalletDialog.vue'

export default Vue.extend({
  components: {
    TopNav,
    SideNav,
    AppLogo,
    WalletDialog
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    userAddress () : string { return this.$store.state.auth.address },

    favIds () : string[] {
      const favsJson: string = localStorage.getItem('favPools') || '[]'
      return JSON.parse(favsJson) || []
    }
  },

  watch: {
    userAddress (newAddress) {
      if (newAddress) this.getPoolShares(newAddress)
    }
  },

  async beforeMount () {
    try {
      await this.getPrices()
      this.setFavIds(this.favIds)
      this.loading = false
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    ...mapActions({
      getPrices: 'prices/getAll',
      getPoolShares: 'poolShares/getAll'
    }),

    ...mapMutations({
      setFavIds: 'pools/setFavIds'
    })
  }
})
</script>
<style>
.default-container {
  @apply bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 min-h-screen pb-12 mx-auto;
  max-width: 1600px;
}
</style>
