<template>
  <component
    :is="tag"
    :class="[defaultClasses, bgClasses, sizeClasses, cursorClasses]"
    v-bind="$attrs"
    :disabled="disabled"
    v-on="listeners"
  >
    <div class="flex justify-center items-center w-full h-full">
      <div v-if="loading" class="w-full">
        <div>
          {{ loadingLabel }}
        </div>
        <div class="relative w-full h-full">
          <div class="absolute right-0 top-0">
            <base-loading-icon
              :size="size"
              :color="loadingColorClass"
              :class="{ '-mt-6': size === 'lg', '-mt-3': size === 'md' }"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <base-icon
          v-if="icon"
          :name="icon"
          :class="[textColorClass, iconSize, { 'mr-2': !circle }]"
        />
        <span class="truncate">
          <slot />
        </span>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseFlatBtn',

  props: {
    tag: { type: String, default: 'button' },
    size: { type: String, default: 'md' },
    color: { type: String, default: 'green' },
    rounded: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingLabel: { type: String, default: 'loading...' },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: null },
    flat: { type: Boolean, default: false }
  },

  computed: {
    listeners () {
      return { ...this.$listeners }
    },

    defaultClasses () : string {
      return 'base-btn font-medium rounded'
    },

    bgClasses () {
      return 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
    },

    sizeClasses () : string {
      switch (this.size) {
        case 'lg':
          return 'px-2 md:px-12 h-16 text-lg md:text-2xl'
        case 'sm':
          return 'px-4 h-8 text-xs'
        case 'xs':
          return 'px-2 h-6 text-xs'
        default:
          return 'px-4 h-12 text-base'
      }
    },

    textColorClass () : string {
      return 'text-gray-900 dark:text-gray-100'
    },

    loadingColorClass () : string {
      return ''
    },

    cursorClasses () : string {
      if (this.disabled) return 'cursor-not-allowed'
      return 'cursor-pointer'
    }
  }
})
</script>

<style scoped>
.base-btn {
  transition: all .2s ease;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -o-transition: all .2s ease;
  -ms-transition: all .2s ease;
  text-decoration: none !important;
  line-height: 0;
}
.base-btn:focus, .base-btn:active {
  outline: none !important;
}
</style>
