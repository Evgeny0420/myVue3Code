<script setup lang="ts">
import { ref, computed } from 'vue';
import TaskList from './TaskList.vue';
import Header from './Header.vue';
import InputTask from './InputTask.vue';
import { ToDoItem } from '../types/ToDoItem';

const todoText = ref<string>('');
const todoList = ref<Array<ToDoItem>>([]);

const pending = computed(() => todoList.value.filter(item => !item.checked));
const done = computed(() => todoList.value.filter(item => item.checked));

const addToDo = (text: string) => {
  if (text && text !== '') {
    todoText.value = text;
    todoList.value.push({
      id: new Date().valueOf(),
      text: todoText.value,
      checked: false,
    });
  }
}

const clearToDo = () => {
  todoText.value = ''
}
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <InputTask
      @add-to-do="addToDo"
      @clear-to-do="clearToDo"
    />
    <div class="py-2 px-4 bg-blue-500">
      Pending ({{ pending.length }})
    </div>
    <TaskList
      :task-list="pending"
    />
    <div class="py-2 px-4 bg-blue-500">
      Completed ({{ done.length }})
    </div>
    <TaskList
      :task-list="done"
    />
  </div>
</template>