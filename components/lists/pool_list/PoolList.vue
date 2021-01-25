<template>
  <div>
    <PoolListItem v-for="(pool, i) in pools" :key="i" :pool="pool" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PoolListItem from './PoolListItem.vue'

export default Vue.extend({
  name: 'PoolList',

  components: {
    PoolListItem
  },

  props: {
    pools: { type: Array, required: true }
  }
})
</script>
