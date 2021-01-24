<template>
  <div
    v-if="show"
    class="top-0 left-0 fixed h-screen w-full z-50"
    @click="hide"
  >
    <transition name="dialog-bg" mode="out-in" appear>
      <div v-if="showContent" class="absolute h-full w-full bg-black bg-opacity-50" />
    </transition>
    <div class="flex h-screen items-end sm:items-center justify-center">
      <transition
        name="content"
        mode="out-in"
        appear
        @after-leave="$emit('close')"
      >
        <div v-if="showContent" class="relative w-full content-container" @click.stop>
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseDialog',

  props: {
    show: { type: Boolean, default: false }
  },

  data () {
    return {
      showContent: false
    }
  },

  watch: {
    show (newVal: boolean) : void {
      this.showContent = newVal
    }
  },

  methods: {
    hide () : void {
      this.showContent = false
    }
  }
})
</script>

<style lang="css" scoped>
.content-container {
  max-width: 500px;
}

.content-enter-active {
  transition: all .2s ease-in-out;
}
.content-leave-active {
  transition: all .2s ease-in-out;
}
.content-enter, .content-leave-to {
  opacity: 0;
  transform: translateY(70%) scale(0.95);
}

.dialog-bg-enter-active {
  transition: all .3s ease-in-out;
}
.dialog-bg-leave-active {
  transition: all .3s ease-in-out;
}
.dialog-bg-enter, .dialog-bg-leave-to {
  background: transparent;
}
</style>
