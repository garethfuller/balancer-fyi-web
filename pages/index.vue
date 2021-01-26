<template>
  <main>
    <PoolList v-if="!loading" :pools="pools" @loadMore="loadMorePools" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
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

    async loadMorePools (): Promise<void> {
      await this.getMorePools(this.pools.length)
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

<style></style>
