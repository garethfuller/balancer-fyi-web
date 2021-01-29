<template>
  <div class="w-full rounded border border-dashed dark:border-gray-700 h-64 flex justify-center items-center">
    <span class="text-gray-400 dark:text-gray-600 text-2xl">
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PoolBlankSlate',

  props: {
    label: { type: String, default: 'No pools' }
  }
})
</script>
