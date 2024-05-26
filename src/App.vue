<script
  setup
  lang="ts"
>
import Sidebar from "./components/Sidebar/Sidebar.vue"
</script>

<template>
  <div
    class="w-screen h-screen p-0 overflow-hidden grid grid-cols-custom"
  >
    <Sidebar />
    <main
      class="overflow-hidden overflow-y-auto"
    >
      <router-view></router-view>
    </main>
  </div>
</template>
