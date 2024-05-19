<script
  setup
  lang="ts"
>
import MainHeader from "./components/headers/MainHeader.vue";
import ToDoProject from "./components/ToDoProject.vue";
</script>

<template>
  <div
    class="w-screen min-h-screen p-0"
  >
    <MainHeader />
    <main
      class="mx-auto px-4"
    >
      <ToDoProject />
    </main>
  </div>
</template>
