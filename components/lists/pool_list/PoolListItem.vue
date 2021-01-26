<template>
  <a :href="`https://pools.balancer.exchange/#/pool/${pool.id}`" target="_blank" rel="noreferrer">
    <BaseCard class="token-card cursor-pointer hover:shadow-xl">
      <div class="absolute">
        <div class="relative top-0 left-0 p-2 text-xs text-gray-300 dark:text-gray-600">
          <span class="uppercase">
            Pool
          </span>
          <EthAddress :address="pool.id" />
        </div>
      </div>
      <div class="token-container px-4 flex flex-wrap items-center justify-center">
        <div class="flex flex-wrap justify-center">
          <div v-for="token in pool.tokens" :key="token.address" class="flex items-center bg-gray-100 dark:bg-gray-800 p-1 pr-2 rounded-full m-1">
            <img
              v-if="token.meta && token.meta.hasIcon"
              :src="token.meta.logoUrl"
              :alt="token.symbol"
              :class="[iconSize, 'rounded-full bg-white']"
            >
            <div v-else :class="[iconSize, 'rounded-full']" :style="`background-color: ${token.color};`" />
            <span class="font-medium text mx-2">
              {{ _int(token.weightPercent) }}%
            </span>
            <span class="token-sym text-xs">
              {{ token.symbol }}
            </span>
          </div>
        </div>
      </div>
      <div class="px-8">
        <div class="flex flex-col">
          <span class="font-bold text-3xl">
            {{ _money(liquidity) }}
          </span>
          <span class="uppercase text-xs font-medium text-gray-400 dark:text-gray-500">
            Market cap.
          </span>
        </div>
      </div>
      <div class="flex justify-between bg-gray-50 dark:bg-gray-800 p-4 px-8 mt-4 border-t border-gray-100 dark:border-gray-700 rounded-b">
        <div class="flex flex-col">
          <span class="font-medium text-sm text-gray-500 dark:text-gray-400">
            {{ _money(0) }}
          </span>
          <span class="uppercase text-xs font-medium text-gray-400 dark:text-gray-500">
            My liquidity
          </span>
        </div>
        <div class="flex flex-col">
          <span class="font-medium text-sm text-gray-500 dark:text-gray-400">
            {{ _money(pool.recentSwapVolume) }}
          </span>
          <span class="uppercase text-xs font-medium text-gray-400 dark:text-gray-500">
            Volume (24h)
          </span>
        </div>
        <div class="flex flex-col">
          <span class="font-medium text-sm text-gray-500 dark:text-gray-400">
            {{ _percent(swapFee) }}
          </span>
          <span class="uppercase text-xs font-medium text-gray-400 dark:text-gray-500">
            Swap fee
          </span>
        </div>
      </div>
    </BaseCard>
  </a>
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
    },

    iconSize () : string {
      switch (this.pool.tokens.length) {
        case 8: case 7: case 6:
          return 'w-4 h-4'
        case 5: case 4: case 3:
          return 'w-6 h-6'
        default:
          return 'w-8 h-8'
      }
    }
  }
})
</script>

<style>
.token-card {
  transition: all .2s ease;
}

.token-container {
  height: 200px;
}

.token-sym {
  max-width: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
