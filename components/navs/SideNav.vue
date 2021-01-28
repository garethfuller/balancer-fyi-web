<template>
  <nav class="px-4 flex flex-col">
    <h3 class="uppercase text-sm font-medium opacity-50 mb-2">
      Pools
    </h3>
    <VertNavList :items="poolItems" @portfolioClicked="handlePortfolioAccess" />

    <h3 class="uppercase text-sm font-medium opacity-50 mb-2 mt-8">
      Balancer
    </h3>
    <VertNavList :items="generalItems" />
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import VertNavList from '~/components/lists/vert_nav_list/VertNavList.vue'

export default Vue.extend({
  name: 'SideNav',

  components: {
    VertNavList
  },

  data () {
    return {
      generalItems: [
        { label: 'Exchange', icon: 'fas fa-sync', to: 'https://balancer.exchange/#/swap', external: true },
        { label: 'Docs', icon: 'fas fa-book', to: 'https://docs.balancer.finance/', external: true },
        { label: 'Discord', icon: 'fab fa-discord', to: 'https://discord.gg/ARJWaeF', external: true }
      ]
    }
  },

  computed: {
    isConnected () : boolean { return this.$store.getters['auth/isConnected'] },

    poolItems () : object[] {
      return [
        { label: 'Explore', icon: 'far fa-compass', to: '/', active: this.$route.name === 'index' },
        { label: 'Trending', icon: 'fas fa-chart-line', to: '/trending', active: this.$route.name === 'trending' },
        { label: 'Favourites', icon: 'far fa-star', to: '/favourites', active: this.$route.name === 'favourites' },
        { label: 'Portfolio', icon: 'fas fa-chart-bar', to: '' },
        { label: 'Create pool', icon: 'fas fa-plus', to: '' }
      ]
    }
  },

  methods: {
    ...mapMutations({
      showAuthDialog: 'auth/setShowDialog'
    }),

    handlePortfolioAccess () : void {
      if (this.isConnected) {
        this.$router.push('/portfolio')
      } else {
        this.showAuthDialog(true)
      }
    }
  }
})
</script>
