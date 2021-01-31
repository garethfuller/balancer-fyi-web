<template>
  <main>
    <PoolLoadingBlocks v-if="loading" />
    <PoolList v-else :pools="pools" no-more />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import PoolList from '~/components/lists/pool_list/PoolList.vue'
import PoolLoadingBlocks from '~/components/lists/pool_list/PoolLoadingBlocks.vue'
import { Pool } from '~/types'
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
    pools (): Pool[] { return this.$store.state.pools.all },

    ids () : string[] {
      const favsJson: string = localStorage.getItem('favPools') || '[]'
      return JSON.parse(favsJson) || []
    },

    poolArgs () : PoolArgs {
      return Object.assign({}, defaultArgs, {
        where: {
          id_in: this.ids
        }
      })
    }
  },

  async beforeMount () {
    await this.getPools(this.poolArgs)
    this.loading = false
  },

  methods: {
    ...mapActions({
      getPools: 'pools/getAll'
    })
  }
})
</script>
