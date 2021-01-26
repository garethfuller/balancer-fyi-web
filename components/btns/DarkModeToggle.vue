<template>
  <BaseBtn class="mr-4" @click="toggle">
    <i :class="[iconClass, 'text-lg']" />
  </BaseBtn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'DarkModeToggle',

  computed: {
    ...mapState(['darkMode']),

    iconClass (): string {
      return this.darkMode ? 'fas fa-sun' : 'fas fa-moon'
    }
  },

  watch: {
    darkMode (on) {
      if (on) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    }
  },

  methods: {
    ...mapMutations(['toggleDarkMode']),

    toggle (): void {
      this.toggleDarkMode()
    }
  }
})
</script>
