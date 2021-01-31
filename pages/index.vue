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
import { argsFor } from '~/lib/subgraph/queries/pools'

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
    pools (): Pool[] { return this.$store.state.pools.all },

    type () : string {
      return this.$route.query.type as string || 'shared'
    }
  },

  watch: {
    async type (newType) : Promise<void> {
      this.loading = true
      await this.getPools(argsFor(newType))
      this.loading = false
    }
  },

  async beforeMount () {
    await this.getPools(argsFor(this.type))
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
      const args = Object.assign({}, argsFor(this.type), { skip: this.pools.length })
      this.setLoading(true)
      await this.getMorePools(args)
      this.setLoading(false)
    }
  }
})
</script>
