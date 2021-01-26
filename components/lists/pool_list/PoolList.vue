<template>
  <BaseGrid>
    <BaseGridItem
      v-for="(pool, i) in pools"
      :key="i"
      width="full"
      class="md:w-1/2 lg:w-1/3"
    >
      <PoolListItem :pool="pool" />
    </BaseGridItem>
  </BaseGrid>
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
