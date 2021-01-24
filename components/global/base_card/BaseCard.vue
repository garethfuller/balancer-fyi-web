<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseCard',

  props: {
    square: { type: Boolean, default: false }
  },

  computed: {
    classes () : string[] {
      const classes = ['bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg']
      if (!this.square) classes.push('rounded')
      return classes
    }
  }
})
</script>
