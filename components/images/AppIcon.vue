<template>
  <img
    ref="icon"
    :src="src"
    alt="Balancer icon"
    class="h-8"
  >
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppIcon',

  computed: {
    ...mapState(['darkMode']),

    imageName () {
      return this.darkMode ? 'icon_white' : 'icon'
    },

    src () {
      return require(`~/assets/images/${this.imageName}.svg`)
    }
  }
}
</script>
