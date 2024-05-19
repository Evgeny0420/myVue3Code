<script
  setup
  lang="ts"
>
import { computed } from "vue";
import todoService from "../services/todo";

const $props = defineProps({
  items: { type: Array, default: () => [] }
});

const status = computed(() => {
  let statusInside: Record<string, any> = {};
  todoService.getStatusList().forEach(stat => {
    statusInside[stat.id]=0;
  });
  $props.items.forEach((todo: any) => {
    statusInside[todo.status] += 1;
  });
  return statusInside;
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-gray-200 p-4">
      <strong>Pending</strong>
      <h2>{{ status?.not_started }}</h2>
    </div>
    <div class="bg-teal-500 p-4">
      <strong>In progress</strong>
      <h2>{{ status?.in_progress }}</h2>
    </div>
    <div class="bg-green-500 p-4">
      <strong>Completed</strong>
      <h2>{{ status?.completed }}</h2>
    </div>
  </div>
</template>
