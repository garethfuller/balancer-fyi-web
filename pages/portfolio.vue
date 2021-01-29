<template>
  <main>
    <h2 class="mb-4 text-xl">
      My Liquidity
    </h2>
    <PoolLoadingBlocks v-if="loading" />
    <PoolList v-else :pools="liquidityProvidedPools" no-more />
    <PoolBlankSlate v-if="!loading && liquidityProvidedPools.length === 0" label="No liquidity provided..." />

    <h2 class="mb-4 mt-8 text-xl">
      My Pools
    </h2>
    <PoolLoadingBlocks v-if="loading" />
    <PoolList v-else :pools="createdPools" no-more />
    <PoolBlankSlate v-if="!loading && createdPools.length === 0" label="No pools created..." />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import PoolList from '~/components/lists/pool_list/PoolList.vue'
import PoolLoadingBlocks from '~/components/lists/pool_list/PoolLoadingBlocks.vue'
import PoolBlankSlate from '~/components/lists/pool_list/PoolBlankSlate.vue'

export default Vue.extend({
  components: {
    PoolList,
    PoolLoadingBlocks,
    PoolBlankSlate
  },

  data () {
    return {
      loading: true,
      liquidityProvidedPools: [],
      createdPools: []
    }
  },

  computed: {
    proxyAddress () : string { return this.$store.state.auth.proxy },

    liquidityProvidedPoolIds () : string[] {
      return Object.keys(this.$store.getters['poolShares/balances']).map(id => id.toLowerCase())
    }
  },

  async beforeMount () {
    this.liquidityProvidedPools = await this.getPoolsById(this.liquidityProvidedPoolIds)
    await this.getProxyAddress()
    this.createdPools = await this.getCreatedPools(this.proxyAddress)
    this.loading = false
  },

  methods: {
    ...mapActions({
      getPoolsById: 'pools/getByIds',
      getProxyAddress: 'auth/getProxy',
      getCreatedPools: 'pools/getByOwner'
    })
  }
})
</script>
