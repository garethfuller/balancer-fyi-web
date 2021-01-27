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
    }
  },

  async beforeMount () {
    await this.getPoolsById(this.ids)
    this.loading = false
  },

  methods: {
    ...mapActions({
      getPoolsById: 'pools/getByIds'
    })
  }
})
</script>
