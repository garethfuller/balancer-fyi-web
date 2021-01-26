<template>
  <main>
    <BaseGrid v-if="loading">
      <BaseGridItem width="full" class="md:w-1/2 lg:w-1/3">
        <div class="loading-block shimmer" />
      </BaseGridItem>
      <BaseGridItem width="full" class="md:w-1/2 lg:w-1/3">
        <div class="loading-block shimmer" />
      </BaseGridItem>
      <BaseGridItem width="full" class="md:w-1/2 lg:w-1/3">
        <div class="loading-block shimmer" />
      </BaseGridItem>
    </BaseGrid>
    <PoolList v-else :pools="pools" @loadMore="loadMorePools" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
import PoolList from '~/components/lists/pool_list/PoolList.vue'
import { Pool } from '~/types'

export default Vue.extend({
  components: {
    PoolList
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
      // getPoolsById: 'pools/getByIds'
      // getLatestSwaps: 'swaps/getLatest'
    }),

    ...mapMutations({
      setLoading: 'pools/setLoading'
    }),

    async loadMorePools (): Promise<void> {
      this.setLoading(true)
      await this.getMorePools(this.pools.length)
      this.setLoading(false)
    }

    // ...mapMutations({
    //   setPools: 'pools/setPools'
    // }),

    // async fetchTrending (): Promise<void> {
    //   const swaps: Swap[] = await this.getLatestSwaps(100)
    //   const poolAddressIds: string[] = [...new Set(swaps.map(swap => swap.poolAddress.id))]
    //   const pools: Pool[] = await this.getPoolsById(poolAddressIds)
    //   let poolsBySwapCount: Array<[string, number]> = []

    //   poolAddressIds.forEach(poolAddress => {
    //     const poolSwaps: Swap[] = swaps.filter(swap => swap.poolAddress.id === poolAddress)
    //     poolsBySwapCount.push([poolAddress, poolSwaps.length])
    //   })
    //   console.log(poolsBySwapCount)
    //   poolsBySwapCount = poolsBySwapCount.sort((a, b) => b[1] - a[1])

    //   const newPools: Pool[] = []
    //   poolsBySwapCount.forEach(p => {
    //     const pool = pools.find(pool => pool.id === p[0])
    //     if (!pool) return
    //     newPools.push(pool)
    //   })

    //   this.setPools(newPools)
    // }
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
