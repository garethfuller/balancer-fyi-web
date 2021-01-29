<template>
  <span>
    {{ label }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EthAddress',

  props: {
    address: { type: String, required: true },
    ensName: { type: String, default: '' },
    segLength: { type: Number, default: 4 }
  },

  computed: {
    label () : string {
      return this.ensName || this.truncatedAddress
    },

    truncatedAddress () : string {
      const firstSegment: string = this.address.substring(0, this.segLength + 2)
      const lastSegment: string = this.address.substring(this.address.length, this.address.length - this.segLength)
      return `${firstSegment}...${lastSegment}`
    }
  }
})
</script>
