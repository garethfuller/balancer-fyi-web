<template>
  <nav class="px-4 flex flex-col">
    <h3 class="uppercase text-sm font-medium opacity-50 mb-2">
      Pools
    </h3>
    <div v-for="(item, i) in poolItems" :key="i" class="flex items-center mb-2 dark:hover:text-white hover:text-black cursor-pointer">
      <div class="w-10">
        <i :class="[item.icon, 'text-xl opacity-50']" />
      </div>
      <h4 class="">
        {{ item.label }}
      </h4>
    </div>

    <h3 class="uppercase text-sm font-medium opacity-50 mb-2 mt-8">
      Balancer
    </h3>
    <div v-for="(item, i) in generalItems" :key="i" class="flex items-center mb-2 dark:hover:text-white hover:text-black cursor-pointer">
      <div class="w-10">
        <i :class="[item.icon, 'text-xl opacity-50']" />
      </div>
      <h4 class="">
        {{ item.label }}
      </h4>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SideNav',

  data () {
    return {
      poolItems: [
        { label: 'Explore', icon: 'far fa-compass' },
        { label: 'Portfolio', icon: 'fas fa-chart-bar' },
        { label: 'Create new', icon: 'fas fa-plus' }
      ],
      generalItems: [
        { label: 'Exchange', icon: 'fas fa-exchange-alt' },
        { label: 'About', icon: 'far fa-question-circle' }
      ]
    }
  }
})
</script>
