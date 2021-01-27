<template>
  <div>
    <BaseBtn
      :disabled="connecting"
      :loading="connecting"
      loading-label="Connecting..."
      :color="isConnected ? 'gray' : 'blue'"
      block
      flat
      @click="setShowDialog(true)"
    >
      <EthAddress v-if="isConnected" :address="address" :ens-name="ensName" />
      <span v-else>
        Connect a wallet
      </span>
    </BaseBtn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'AuthBtn',

  computed: {
    address (): string { return this.$store.state.auth.address },
    ensName (): string { return this.$store.state.auth.ensName },
    connecting (): boolean { return this.$store.state.auth.connecting },
    isConnected (): boolean { return this.$store.getters['auth/isConnected'] }
  },

  methods: {
    ...mapMutations({
      setShowDialog: 'auth/setShowDialog'
    })
  }
})
</script>
