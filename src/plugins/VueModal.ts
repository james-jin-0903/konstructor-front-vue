import Vue from 'vue';
import VModal from 'vue-js-modal'

export default class VueModalPlugin {
  public static init() {
    Vue.use(VModal);
  }
}
