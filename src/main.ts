import Vue from 'vue';

import AppLayout from './layout/index.vue';
import router from './router';
import store from './store';


import './scss/style.scss';
import './assets/fonts/opensans.css';

import ru from './utils/vee-locale-ru';
import VeeValidate, { Validator } from 'vee-validate';
import { i18n } from './i18n';
import VueCompositionApi from '@vue/composition-api';
import VueApexCharts from 'vue-apexcharts';
import LineClamp from '@/plugins/LineClamp';
import VueModal from '@/plugins/VueModal';
import textMiddleEllipsis from 'vue-text-middle-ellipsis';
import * as VueSpinnersCss from 'vue-spinners-css';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(VueSpinnersCss);
Vue.use(
  VeeValidate, {
    classes: true,
    locale: 'ru',
    events: 'blur',
    mode: 'lazy',
    classNames: {
      valid: 'is-valid',
      invalid: 'is-invalid'
    }
  }
);

Validator.localize('ru', ru);

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);

    if (binding.modifiers.right) {
      document.body.addEventListener('contextmenu', el.clickOutsideEvent);
    }
  },
  unbind: function(el) {
    // @ts-ignore
    document.body.removeEventListener('click', el.clickOutsideEvent);
    // @ts-ignore
    document.body.removeEventListener('contextmenu', el.clickOutsideEvent);
  }
});

LineClamp.init();
VueModal.init();
Vue.use(textMiddleEllipsis);

new Vue({
  name: 'Root',
  router,
  i18n,
  store,
  mounted() {
    //libs
  },
  render: h => h(AppLayout)
}).$mount('#app');
