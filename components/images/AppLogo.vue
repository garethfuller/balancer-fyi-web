<template>
  <div class="flex items-center">
    <AppIcon />
    <span class="ml-3 text-lg font-light dark:text-white">
      Balancer
    </span>
  </div>
</template>

<script lang="ts">
import AppIcon from './AppIcon.vue'

export default {
  name: 'AppLogo',

  components: {
    AppIcon
  }
}
</script>
