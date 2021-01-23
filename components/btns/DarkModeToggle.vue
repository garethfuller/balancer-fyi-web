<template>
  <div
    class="w-12 h-12 text-xl rounded-full flex items-center justify-center cursor-pointer bg-gray-100 dark:bg-gray-800"
    @click="toggle"
  >
    <i :class="iconClass" />
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DarkModeToggle',

  computed: {
    ...mapState(['darkMode']),

    iconClass (): string {
      // @ts-ignore
      return this.darkMode ? 'fas fa-sun' : 'fas fa-moon'
    }
  },

  methods: {
    ...mapMutations(['toggleDarkMode']),

    toggle (): void {
      document.body.classList.toggle('dark')
      this.toggleDarkMode()
    }
  }
}
</script>
