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
    <BaseGridItem v-if="!noMore" width="full" class="md:w-1/2 lg:w-1/3">
      <LoadMoreBtn @click.native="$emit('loadMore')" />
    </BaseGridItem>
  </BaseGrid>
</template>

<script lang="ts">
import Vue from 'vue'
import PoolListItem from './PoolListItem.vue'
import LoadMoreBtn from '~/components/btns/LoadMoreBtn.vue'

export default Vue.extend({
  name: 'PoolList',

  components: {
    PoolListItem,
    LoadMoreBtn
  },

  props: {
    pools: { type: Array, required: true },
    noMore: { type: Boolean, default: false }
  }
})
</script>
