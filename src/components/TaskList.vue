<script
  setup
  lang="ts"  
>
import { ToDoItem } from '../types/ToDoItem';
import TaskItem from './TaskItem.vue';

defineProps<{
  taskList: ToDoItem[];
}>();
</script>

<template>
  <div
    class="py-2 px-4"
    v-for="task in taskList"
    :key="task.id"
  >
    <TaskItem
      :task
    />
  </div>
  <div
    class="py-2 px-4"
    v-show="taskList.length === 0"
  >
    No tasks
  </div>
</template>