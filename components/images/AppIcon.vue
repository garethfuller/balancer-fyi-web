<template>
  <img
    ref="icon"
    :src="src"
    alt="Balancer icon"
    class="h-6"
  >
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'AppIcon',

  computed: {
    ...mapState(['darkMode']),

    imageName () : string {
      return this.darkMode ? 'icon_white' : 'icon'
    },

    src () : string {
      return require(`~/assets/images/${this.imageName}.svg`)
    }
  }
}
</script>
