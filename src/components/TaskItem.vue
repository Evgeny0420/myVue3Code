<script setup lang="ts">
import { ToDoItem } from '../types/ToDoItem';

defineProps<{
  task: ToDoItem;
}>();
</script>

<template>
  <label class="flex cursor-pointer">
    <input
      type="checkbox"
      v-model="task.checked"
    >
    <span class="ml-4">
      {{ task.text }}
    </span>
  </label>
</template>