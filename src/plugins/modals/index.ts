import { App, reactive } from 'vue';
import Modal from './Modal.vue';

const current = reactive<Record<string, any>>({
  name: '',
  resolve: null,
  reject: null,
});

const api = {
  resetName () {
    current.name = '';
  },
  active () {
    return current.name;
  },
  show (name: string) {
    current.name = name;
    return new Promise((resolve = () => {}, reject = () => {}) => {
      current.resolve = resolve;
      current.reject = reject;
    })
  },
  accept () {
    current.resolve();
    this.resetName();
  },
  cancel () {
    current.reject();
    this.resetName();
  }
};

const plugin = {
  install(App: App, options: Record<string, any> = {}) {
    App.component("Modal", Modal);
    App.provide("$modals", api);
  }
}

export default plugin;