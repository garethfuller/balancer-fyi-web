<template>
  <main>
    <PoolLoadingBlocks v-if="loading" />
    <PoolList v-else :pools="trendingPools" no-more />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Prices, Swap, Pool } from '~/types'
import { getters } from '~/store/swaps'
import PoolList from '~/components/lists/pool_list/PoolList.vue'
import PoolLoadingBlocks from '~/components/lists/pool_list/PoolLoadingBlocks.vue'
import { defaultArgs, PoolArgs } from '~/lib/subgraph/queries/pools'

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
    prices () : Prices { return this.$store.state.prices.all },
    swaps () : Swap[] { return this.$store.state.swaps.all },
    pools () : Pool[] { return this.$store.state.pools.all },
    poolsIdsByAmountIn () : string[] { return this.$store.getters['swaps/poolIdsByAmountIn'] as ReturnType<typeof getters.poolIdsByAmountIn> },

    trendingPools () : Pool[] {
      const pools: Pool[] = []
      this.poolsIdsByAmountIn.forEach(id => {
        const pool = this.pools.find(pool => pool.id === id)
        if (pool) pools.push(pool)
      })
      return pools.slice(0, 10)
    },

    poolArgs () : PoolArgs {
      return Object.assign({}, defaultArgs, {
        where: {
          id_in: this.poolsIdsByAmountIn
        }
      })
    }
  },

  async beforeMount () {
    try {
      await this.getSwaps(this.prices)
      await this.getPools(this.poolArgs)
      this.loading = false
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    ...mapActions({
      getSwaps: 'swaps/getLast24h',
      getPools: 'pools/getAll'
    })
  }
})
</script>
