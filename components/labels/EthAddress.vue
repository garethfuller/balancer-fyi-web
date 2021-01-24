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
    hash: { type: Boolean, default: false },
    segLength: { type: Number, default: 4 }
  },

  data () {
    return {
      label: ''
    }
  },

  watch: {
    address (newAddresss: string) : void {
      this.truncateLabel(newAddresss)
      if (!this.hash) this.setEnsLabel()
    }
  },

  beforeMount () {
    this.truncateLabel(this.address)
    if (!this.hash) this.setEnsLabel()
  },

  methods: {
    setEnsLabel () : void {
      try {
        if (this.ensName) {
          this.label = this.ensName
        } else {
          this.truncateLabel(this.address)
        }
      } catch (error) {
        console.error(error)
      }
    },

    truncateLabel (address: string) : void {
      const firstSegment: string = address.substring(0, this.segLength + 2)
      const lastSegment: string = address.substring(address.length, address.length - this.segLength)
      this.label = `${firstSegment}...${lastSegment}`
    }
  }
})
</script>
