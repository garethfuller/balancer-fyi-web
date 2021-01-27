<template>
  <nav class="flex flex-col">
    <VertNavListItem
      v-for="item in items"
      :key="item.label"
      :item="item"
      class="mb-2"
    />
  </nav>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import VertNavListItem, { NavItem } from './VertNavListItem.vue'

export default Vue.extend({
  name: 'VertNavList',

  components: {
    VertNavListItem
  },

  props: {
    items: { type: Array, required: true } as PropOptions<NavItem[]>
  }
})
</script>
