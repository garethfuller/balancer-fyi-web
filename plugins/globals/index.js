import Vue from 'vue'

import mixins from './mixins'

const Globals = {
  install (Vue) {
    Vue.mixin(mixins)
  }
}

Vue.use(Globals)
