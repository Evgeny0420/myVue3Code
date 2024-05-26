import { App, reactive, Plugin } from "vue";
import Modal from "./Modal.vue";
import { ModalState, Modals } from "../../types/Modals";

const current = reactive<ModalState>({
  name: "",
  resolve: null,
  reject: null,
});
const api: Modals = {
  resetName () {
    current.name = '';
  },
  active() {
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
    if (current.resolve) {
      current.resolve();
      this.resetName();
    }
  },
  cancel() {
    if (current.reject) {
      current.reject();
      this.resetName();
    }
  }
};
const plugin: Plugin = {
  install(App: App, options: Record<string, any> = {}) {
    App.component("Modal", Modal);
    App.provide("$modals", api);
  },
};

export default plugin;
