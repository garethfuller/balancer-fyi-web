<template>
  <nav class="flex justify-between items-center px-8 py-4">
    <AppLogo />
    <AuthBtn />
  </nav>
</template>

<script lang="ts">
import AppLogo from '~/components/images/AppLogo.vue'
import AuthBtn from '~/components/btns/AuthBtn.vue'

export default {
  name: 'AppNav',

  components: {
    AppLogo,
    AuthBtn
  }
}
</script>
