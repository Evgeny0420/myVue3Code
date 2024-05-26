<script
  setup
  lang="ts"
>
import { inject, computed, onBeforeUnmount, watch } from "vue";
import { Modals } from "../../types/Modals";

const $props = defineProps({
  name: { type: String, default: "" },
  title: { type: String, default: "Modal dialog" },
});
const $modals = inject<Modals>("$modals");
const _show = computed(() => $modals?.active() === $props.name);

watch(_show, (newVol) => {
  if (newVol) {
    document.addEventListener('keydown', closeFromEscape);
  } else {
    document.removeEventListener('keydown', closeFromEscape);
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', closeFromEscape);
});

function closeModal(accept: boolean = false): void {
  accept ? $modals?.accept() : $modals?.cancel();
}

function closeFromEscape (event: KeyboardEvent): void {
  if (event.key === "Escape") {
    closeModal(false);
  }
}
</script>

<template>
  <div
    v-if="_show" 
    class="flex justify-center items-center fixed z-50 top-0 left-0 h-screen w-screen bg-black bg-opacity-40 text-white"
    @click.self="closeModal(false)"
  >
    <div class=" shadow-xl">
      <header class="bg-blue-500 px-4 py-2 select-none flex justify-between">
        <h2>
          {{ $props.title }}
        </h2>
        <button
          class="w-7 h-7 rounded-full hover:bg-blue-400"
          @click="closeModal(false)"
        >
          <svg
            class="w-7 h-7 fill-white"
            viewBox="0 0 64 64"
          >
            <path d="m51.8 12.2a28 28 0 0 0 -39.6 39.6 28 28 0 0 0 39.6-39.6zm-2.828 36.77a24 24 0 1 1 0-33.942 23.847 23.847 0 0 1 -.001 33.943z"/><path d="m41.699 19.375-9.748 9.748-9.749-9.748-2.828 2.828 9.748 9.748-9.748 9.748 2.828 2.828 9.749-9.748 9.19 9.19 2.828-2.828-9.19-9.19 9.748-9.748z"/>
          </svg>
        </button>
      </header>
      <main class="px-4 py-2 min-h-20 max-w-2xl bg-white text-black">
        <slot />
      </main>
      <footer class="text-rirht bg-blue-500 px-4 py-2 select-none">
        <button
          class="border border-white inline-flex px-4 py-2 overflow-hidden no-underline text-inherit bg-blue-500 hover:bg-blue-400 text-center cursor-pointer whitespace-nowrap rounded-lg"
          @click="closeModal(true)"
        >
          Accept
        </button>
      </footer>
    </div>
  </div>
</template>
