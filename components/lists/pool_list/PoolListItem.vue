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
      {{ _money(liquidity) }}
    </div>
    <div>
      {{ _money(pool.recentSwapVolume) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { liquidityFor } from '~/lib/balancer/poolHelpers'
import { Pool, Prices } from '~/types'

export default Vue.extend({
  name: 'PoolListItem',

  props: {
    pool: { type: Object, required: true } as PropOptions<Pool>
  },

  computed: {
    prices (): Prices { return this.$store.state.prices.all },

    swapFee () : string {
      return this.pool.swapFee
    },

    liquidity () : number {
      return Number(liquidityFor(this.pool, this.prices))
    }
  }
})
</script>
