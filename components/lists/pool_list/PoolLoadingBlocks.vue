<template>
  <BaseGrid>
    <BaseGridItem width="full" class="md:w-1/2 lg:w-1/3">
      <div class="loading-block shimmer" />
    </BaseGridItem>
    <BaseGridItem width="full" class="md:w-1/2 lg:w-1/3">
      <div class="loading-block shimmer" />
    </BaseGridItem>
    <BaseGridItem width="full" class="md:w-1/2 lg:w-1/3">
      <div class="loading-block shimmer" />
    </BaseGridItem>
  </BaseGrid>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'PoolLoadingBlocks'
})
</script>

<style>
.loading-block {
  @apply cursor-pointer h-full rounded flex items-center justify-center;
  min-height: 300px;
}

@keyframes shimmerBackground {
  0% {background-position:-5000px 0}
  100% {background-position:5000px 0}
}

.shimmer {
  animation : shimmerBackground 10s infinite;
  background: linear-gradient(to right, #F9FAFB 4%, #F3F4F6 25%, #F9FAFB 36%);
  background-size: 1000px 100%;
}
</style>
