<script
  setup
  lang="ts"
>
import { ref, inject } from "vue";
import { Modals } from "./types/Modals";

const $modals = inject<Modals>("$modals");
const result = ref("");

function showModal() {
  result.value = "";
  $modals?.show("myModal")
    .then(() => {
      result.value = "Modal accepted"
    }, () => {
      result.value = "Modal cancelled"
    })
}

</script>

<template>
  <div
    class="w-screen min-w-screen p-0"
  >
    <button @click="showModal">
      Show modal
    </button>
    <div>{{ result }}</div>
    <Modal name="myModal" title="Modal example">
      Some important content here
    </Modal>
  </div>
</template>
