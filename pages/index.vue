<template>
  <main>
    <PoolLoadingBlocks v-if="loading" />
    <PoolList v-else :pools="pools" @loadMore="loadMorePools" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
import PoolList from '~/components/lists/pool_list/PoolList.vue'
import PoolLoadingBlocks from '~/components/lists/pool_list/PoolLoadingBlocks.vue'
import { Pool } from '~/types'

export default Vue.extend({
  components: {
    PoolList,
    PoolLoadingBlocks
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    pools (): Pool[] { return this.$store.state.pools.all }
  },

  async beforeMount () {
    await this.getPools()
    this.loading = false
  },

  methods: {
    ...mapActions({
      getPools: 'pools/getAll',
      getMorePools: 'pools/getMore'
    }),

    ...mapMutations({
      setLoading: 'pools/setLoading'
    }),

    async loadMorePools (): Promise<void> {
      this.setLoading(true)
      await this.getMorePools(this.pools.length)
      this.setLoading(false)
    }
  }
})
</script>

<style>
.loading-block {
  @apply cursor-pointer h-full rounded flex items-center justify-center;
  min-height: 300px;
}

@keyframes shimmerBackground {
  0% {background-position:-5000px 0}
  100% {background-position:5000px 0}
}

.shimmer {
  animation : shimmerBackground 10s infinite;
  background: linear-gradient(to right, #F9FAFB 4%, #F3F4F6 25%, #F9FAFB 36%);
  background-size: 1000px 100%;
}
</style>
