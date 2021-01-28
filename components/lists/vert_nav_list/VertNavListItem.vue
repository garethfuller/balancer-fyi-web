<template>
  <div>
    <a
      v-if="item.external"
      :href="item.to"
      target="_blank"
      rel="noreferrer"
      class="flex items-center dark:hover:text-white hover:text-black cursor-pointer"
      @click="emitEvent"
    >
      <div class="w-10">
        <i :class="[item.icon, 'text-xl opacity-50']" />
      </div>
      <h4 class="">
        {{ item.label }}
      </h4>
    </a>
    <nuxt-link
      v-else
      :to="item.to"
      :class="[
        'flex items-center dark:hover:text-white hover:text-black cursor-pointer',
        { 'text-blue-500 hover:text-blue-500 dark:hover:text-blue-500': item.active }
      ]"
      @click.native="emitEvent"
    >
      <div class="w-10">
        <i :class="[item.icon, 'text-xl opacity-50']" />
      </div>
      <h4 class="">
        {{ item.label }}
      </h4>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export interface NavItem {
  label: string,
  icon: string,
  to?: string,
  external?: boolean,
  active?: boolean
}

export default Vue.extend({
  name: 'VerticalNavList',

  props: {
    item: { type: Object, required: true } as PropOptions<NavItem>
  },

  methods: {
    emitEvent () : void {
      this.$emit('itemClicked', this.item)
    }
  }
})
</script>
