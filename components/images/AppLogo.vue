<template>
  <div class="flex items-center">
    <AppIcon />
    <span class="ml-4 text-lg font-light">
      Balancer
    </span>
  </div>
</template>

<script>
import AppIcon from './AppIcon.vue'

export default {
  name: 'AppLogo',

  components: {
    AppIcon
  }
}
</script>
