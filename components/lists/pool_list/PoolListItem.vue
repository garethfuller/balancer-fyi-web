<template>
  <div class="flex justify-between">
    <EthAddress :address="pool.id" />
    <div>
      <span v-for="token in pool.tokens" :key="token.address">
        {{ token.symbol }} ({{ _int(token.weightPercent) }}%),
      </span>
    </div>
    <div>
      {{ _percent(swapFee) }}
    </div>
    <div>
      {{ _money(liquiditity) }}
    </div>
    <div>
      {{ _money(pool.recentSwapVolume) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { liquiditityFor } from '~/lib/balancer/poolHelpers'

export default Vue.extend({
  name: 'PoolListItem',

  props: {
    pool: { type: Object, required: true }
  },

  computed: {
    ...mapState({
      prices: state => state.prices.all
    }),

    swapFee () : number {
      return this.pool.swapFee
    },

    liquiditity () : number {
      return Number(liquiditityFor(this.pool, this.prices))
    }
  }
})
</script>
