<template>
  <div>
    <PoolList :pools="pools" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import PoolList from '~/components/lists/pool_list/PoolList.vue'

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
    ...mapState({
      pools: state => state.pools.all
    })
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
