<template>
  <div :class="`px-${spacing/2}`">
    <div :class="[`flex -mx-${spacing}`, { 'flex-wrap': !noWrap }]">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseGrid',

  props: {
    spacing: { type: String, default: '4' },
    vSpacing: { type: String, default: '4' },
    noWrap: { type: Boolean, default: false }
  },

  mounted () {
    this.$children.forEach(item => {
      item.spacing = this.spacing
      item.vSpacing = this.vSpacing
    })
  }
})
</script>
