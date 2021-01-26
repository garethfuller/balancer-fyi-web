<template>
  <div class="load-more-btn">
    <div class="font-medium text-gray-500">
      Load more...
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadMoreBtn'
})
</script>

<style>
.load-more-btn {
  @apply bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800;
  @apply cursor-pointer h-full rounded flex items-center justify-center;
  transition: all .2s ease;
}
</style>
