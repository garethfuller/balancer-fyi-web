<template>
  <div :class="['pool-fav-btn', textColorClasses]" @click.prevent="toggleFav">
    <i class="fa fa-star" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'PoolFavBtn',

  props: {
    poolId: { type: String, required: true }
  },

  computed: {
    favIds () : string[] { return this.$store.state.pools.favIds },

    isFav () : boolean { return this.favIds.includes(this.poolId) },

    textColorClasses () : string {
      if (this.isFav) return 'text-yellow-300'
      return 'text-gray-300 hover:text-yellow-300 dark:hover:text-yellow-300 dark:text-gray-600'
    }
  },

  methods: {
    ...mapMutations({
      addFav: 'pools/addFav',
      removeFav: 'pools/removeFav'
    }),

    toggleFav () : void {
      if (this.favIds.includes(this.poolId)) {
        this.removeFav(this.poolId)
      } else {
        this.addFav(this.poolId)
      }
    }
  }
})
</script>

<style>
.pool-fav-btn {
  @apply flex w-8 h-8 rounded-full items-center justify-center;
}
</style>
