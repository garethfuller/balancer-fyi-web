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
