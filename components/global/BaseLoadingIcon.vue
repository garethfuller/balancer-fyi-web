<template>
  <div :class="['spinner', sizeClasses]">
    <div :class="`double-bounce1 ${colorClass}`" />
    <div :class="`double-bounce2 ${colorClass}`" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseLoadingIcon',

  props: {
    color: { type: String, default: 'primary' },

    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
    }
  },

  computed: {
    sizeClasses (): string {
      switch (this.size) {
        case 'lg':
          return 'lg'
        case 'sm':
          return 'sm'
        default:
          return 'md'
      }
    },

    colorClass (): string {
      switch (this.color) {
        case 'white':
          return 'bg-white'
        default:
          return 'bg-primary-500'
      }
    }
  }
})
</script>

<style scoped>
.spinner {
  position: relative;
}
.sm {
  width: 16px;
  height: 16px;
}
.md {
  width: 24px;
  height: 24px;
}
.lg {
  width: 48px;
  height: 48px;
}
.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}
.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
