<template>
  <div class="p-4">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseCardContent'
})
</script>
