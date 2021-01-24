<template>
  <div :class="classes">
    <component :is="tag" v-if="!!title" class="text-2xl">
      {{ title }}
    </component>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseCardTitle',

  props: {
    tag: { type: String, default: 'h3' },
    title: { type: String, default: '' }
  },

  computed: {
    classes () : string[] {
      return ['flex items-center pt-4 px-4']
    }
  }
})
</script>
