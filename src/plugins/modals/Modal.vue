<script
  setup
  lang="ts"
>
import { inject, computed } from 'vue';
import { Modals } from '../../types/Modals';

const $props = defineProps({
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Модальный диалог'
  }
});
const $modals = inject<Modals>("$modals");
const show = computed(() => $modals?.active() === $props.name);

function closeModal (accept: boolean = false) {
  accept ? $modals?.accept() : $modals?.cancel();
}
</script>

<template>
  <div
    v-if="show"
    class="flex select-none justify-center items-center fixed z-50 top-0 left-0 h-screen w-screen bg-black bg-opacity-40"
  >
    <div
      class="border border-black shadow-lg duration-500"
    >
      <header
        class="bg-indigo-500 p-4"
      >
        {{ $props.title }}
      </header>
      <main
        class="min-h-20 max-w-screen-lg bg-white p-4"
      >
        <slot />
      </main>
      <footer
        class="p-1 bg-indigo-500 text-right"
      >
        <button
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
          @click="closeModal(true)"
        >
          Acceot
        </button>
        <button
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
          @click="closeModal(false)"
        >
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>