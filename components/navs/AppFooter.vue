<template>
  <div>
    <DarkModeToggle
      class="fixed bottom-0 z-50 right-0 mr-2 md:mr-6 mb-2 md:mb-6"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DarkModeToggle from '~/components/btns/DarkModeToggle.vue'

export default Vue.extend({
  name: 'AppFooter',

  components: {
    DarkModeToggle
  }
})
</script>
