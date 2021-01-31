<template>
  <nav class="flex justify-between items-center h-20">
    <div class="flex">
      <BaseDropdown v-if="$route.path === '/'" :items="items" @clicked="handlePoolType">
        <span class="capitalize">
          {{ currentType }}
        </span>
      </BaseDropdown>
    </div>
    <div class="flex">
      <DarkModeToggle />
      <AuthBtn />
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthBtn from '~/components/btns/AuthBtn.vue'
import DarkModeToggle from '~/components/btns/DarkModeToggle.vue'

export default Vue.extend({
  name: 'TopNav',

  components: {
    AuthBtn,
    DarkModeToggle
  },

  data () {
    return {
      items: [
        { key: 'shared', title: 'Shared pools', description: 'Parameters are fixed, and anyone can add/remove liquidity and swap tokens.' },
        { key: 'smart', title: 'Smart pools', description: 'Core Balancer Pools controlled by a smart contract.' },
        { key: 'private', title: 'Private pools', description: 'Parameters are not fixed, and only the pool creator can add liquidity.' }
      ]
    }
  },

  computed: {
    currentType () : string {
      const type = this.$route.query.type as string || 'shared'
      return `${type} pools`
    }
  },

  methods: {
    handlePoolType (type: string) : void {
      this.$router.push({ path: '/', query: { type } })
    }
  }
})
</script>
