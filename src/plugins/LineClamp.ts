import Vue from 'vue';
import lineClamp from 'vue-line-clamp';

export default class VueLineClamp {
  static init() {
    Vue.use(lineClamp);
  }
}
