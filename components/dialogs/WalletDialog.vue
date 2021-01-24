<template>
  <BaseDialog :show="show" @close="$emit('close')">
    <BaseCard>
      <BaseCardTitle :title="title" />
      <BaseCardContent>
        <div v-if="!!error" class="border-red-500 bg-red-100 text-red-500 rounded p-4 mb-4">
          {{ error }}
        </div>
        <BaseGrid>
          <BaseGridItem width="full" class="md:w-1/2">
            <div
              class="wallet-btn bg-gray-100 text-gray-700 py-8 flex flex-col items-center justify-end cursor-pointer rounded hover:bg-gray-200 hover:text-gray-800"
              @click="$emit('clicked', 'metamask')"
            >
              <img :src="require('~/assets/images/wallets/metamask.svg')" alt="MetaMask logo" class="h-24 lg:h-32 w-auto">
              <span class="font-bold text-lg">
                MetaMask
              </span>
            </div>
          </BaseGridItem>
          <BaseGridItem width="full" class="md:w-1/2">
            <div
              class="wallet-btn h-full bg-gray-100 text-gray-700 py-8 flex flex-col items-center justify-end cursor-pointer rounded hover:bg-gray-200 hover:text-gray-800"
              @click="$emit('clicked', 'walletConnect')"
            >
              <img :src="require('~/assets/images/wallets/walletconnect.svg')" alt="WalletConnect logo" class="h-16 lg:h-20 w-auto mb-6">
              <span class="font-bold text-lg">
                WalletConnect
              </span>
            </div>
          </BaseGridItem>
        </BaseGrid>
      </BaseCardContent>
    </BaseCard>
  </BaseDialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'WalletDialog',

  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: 'Connect Wallet' },
    error: { type: String, default: '' }
  }
})
</script>
