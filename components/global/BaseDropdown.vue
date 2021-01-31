<template>
  <div class="relative">
    <BaseBtn @click.stop="show = !show">
      <slot />
      <i class="fas fa-caret-down ml-2" />
    </BaseBtn>
    <BaseCard v-if="show" v-click-outside="handleOutsideClick" class="absolute top-12 left-0 z-50 w-64">
      <div
        v-for="item in items"
        :key="item.key"
        class="flex flex-col p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer hover:text-blue-500"
        @click="$emit('clicked', item.key)"
      >
        <span class="text-lg">
          {{ item.title }}
        </span>
        <span v-if="item.description" class="text-xs text-gray-500">
          {{ item.description }}
        </span>
      </div>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
// @ts-ignore
import ClickOutside from 'vue-click-outside'

interface Item {
  key: string,
  title: string,
  description?: string
}

export default Vue.extend({
  name: 'BaseDropdown',

  directives: {
    ClickOutside
  },

  props: {
    items: { type: Array, required: true } as PropOptions<Item[]>
  },

  data () {
    return {
      show: false
    }
  },

  methods: {
    handleOutsideClick () : void {
      if (this.show) this.show = false
    }
  }
})
</script>
