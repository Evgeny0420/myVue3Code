<script
  setup
  lang="ts"
>
import { ref } from "vue";
import todoService from "../services/todo";

const $props = defineProps({
  modelValue: Object,
  default () {
    return {}
  }
});

console.log($props.modelValue)
const $emit = defineEmits(["update:modelValue"]);
const item = ref({});

item.value = { ...$props.modelValue };

function emitUpdate () {
  $emit("update:modelValue", item.value);
}


</script>

<template>
  <div class="flex flex-col md:flex-row md:space-x-4 p-4">
    <div class="flex flex-col md:w-1/2 mb-4 md:mb-0">
      <strong class="mb-2">
        Description
      </strong>
      <input 
        type="text" 
        class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        v-model.string="item.text" 
        @blur="emitUpdate"
      >
    </div>

    <div class="flex flex-col md:w-1/2">
      <strong class="mb-2">Status</strong>
      <select 
        class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        v-model.string="item.status" 
        @change="emitUpdate"
      >
        <option 
          v-for="state in todoService.getStatusList()" 
          :key="state.id" 
          :value="state.id"
        >
          {{state.label}}
        </option>
      </select>
    </div>
  </div>
</template>

