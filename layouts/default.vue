<template>
  <div
    class="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 min-h-screen"
  >
    <AppNav />
    <Nuxt />
    <AppFooter />
  </div>
</template>
<script>
import AppNav from '~/components/navs/AppNav.vue'
import AppFooter from '~/components/navs/AppFooter.vue'

export default {
  components: {
    AppNav,
    AppFooter
  },

  head: {
    bodyAttrs: {
      class: 'dark min-h-screen'
    }
  }
}
</script>
<style></style>
