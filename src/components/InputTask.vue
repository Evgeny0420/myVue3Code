<script
  setup
  lang="ts"
>
import{ ref } from 'vue';

const emit = defineEmits([
  'addToDo',
  'clearToDo',
])

const todoText = ref<string>('');

const addToDo = () => {
  if (!todoText.value || todoText.value === '') {
    return
  }
  emit('addToDo', todoText.value);
  clearToDo();
}

const clearToDo = () => {
  todoText.value = '';
}
</script>

<template>
  <div class="container mx-auto bg-gray-200 py-2 px-4 flex gap-1">
    <input
      class="border border-gray-300 rounded-md px-3 py-2"
      type="text"
      v-model="todoText"
      @keyup.enter="addToDo()"
      placeholder="Type here your to-do item..."
    >
    <button
      class="bg-gray-500 p-2 rounded-md hover:shadow-lg hover:bg-gray-400 hover:bottom-0.5 relative"
      @click="clearToDo()"
    >
      del
    </button>
    <button
      class="bg-blue-500 p-2 rounded-md hover:shadow-lg hover:bg-blue-400 hover:bottom-0.5 relative"
      @click="addToDo()"
    >
      acc
    </button>
  </div>
</template>