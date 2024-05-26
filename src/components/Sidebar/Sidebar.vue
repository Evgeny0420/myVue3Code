<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import eventBus from "../../services/eventBus";
import todoService from "../../services/todo";
import { Project } from "../../types/Projects";

const _projects = ref<Array<Project>>([]);

updateProjects();

onMounted(() => {
  eventBus.on("#UpdateProjects", updateProjects);
});

onBeforeUnmount(() => {
  eventBus.off("#UpdateProjects", updateProjects);
});

function updateProjects() {
  const projects = todoService.loadProjectsManifest();
  _projects.value = projects.list;
}
</script>

<template>
  <section class="bg-blue-500 text-white">
    <h4 class="p-4 text-xl">
      To-Do Projects
    </h4>

    <RouterLink
      :to="{ name: 'landing' }"
      class="p-2 block hover:text-black"
      active-class="bg-yellow-300 text-black"
    >
      Home
    </RouterLink>

    <div v-for="p in _projects" :key="p.id">
      <RouterLink
        :to="{ name: 'project', params: { id: p.id } }"
        class="p-2 block hover:text-black"
        active-class="bg-yellow-300 text-black"
      >
        {{ p.name }}
      </RouterLink>
    </div>
  </section>
</template>
