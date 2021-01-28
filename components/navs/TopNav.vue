<template>
  <nav class="flex justify-between items-center p-4">
    <nuxt-link to="/">
      <AppLogo />
    </nuxt-link>
    <div class="flex">
      <DarkModeToggle />
      <AuthBtn />
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import AppLogo from '~/components/images/AppLogo.vue'
import AuthBtn from '~/components/btns/AuthBtn.vue'
import DarkModeToggle from '~/components/btns/DarkModeToggle.vue'

export default Vue.extend({
  name: 'TopNav',

  components: {
    AppLogo,
    AuthBtn,
    DarkModeToggle
  }
})
</script>
