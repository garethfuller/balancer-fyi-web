import Vue from 'vue'

import * as mixins from './mixins'
import * as filters from './filters'

const Globals = {
  install (Vue) {
    Object.keys(mixins).forEach(mixin => {
      Vue.mixin(mixins[mixin])
    })

    Object.keys(filters).forEach(filter => {
      Vue.filter(filter, filters[filter])
    })
  }
}

Vue.use(Globals)
