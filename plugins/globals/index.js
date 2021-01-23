import Vue from 'vue'

import * as mixins from './mixins'

const Globals = {
  install (Vue) {
    Object.keys(mixins).forEach(mixin => {
      Vue.mixin(mixins[mixin])
    })
  }
}

Vue.use(Globals)
