<template>
  <div>
    <PoolList :pools="pools" />
  </div>
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
    console.log(this.pools)
    this.loading = false
  },

  methods: {
    ...mapActions({
      getPools: 'pools/getAll'
    })
  }
})
</script>

<style></style>
