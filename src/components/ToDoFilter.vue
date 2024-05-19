<script
  setup
  lang="ts"
>
import {ref, onMounted} from "vue";

const $props = defineProps(["modelValue"]);
const $emit = defineEmits(["update:modelValue"]);
const inputValue = ref("");

onMounted(() => {
  inputValue.value = $props.modelValue;
});

function clear () {
  inputValue.value = "";
  publishValue();
}

function publishValue () {
  $emit("update:modelValue", inputValue.value)
}
</script>

<template>
  <div class="flex border justify-between">
    <input
      type="text"
      class="p-2 border-0 border-b w-full"
      v-model="inputValue"
      @keyup="publishValue()"
      placeholder="Enter filter text here..."
    >
    <button class="p-2 border-0 bg-slate-200 hover:bg-slate-300" @click="clear()">
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="SVGRepo_bgCarrier"
          stroke-width="0"
        />
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M17 15L11 9.00001M17 9L11 15" 
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M7.4 4.8C7.77771 4.29639 8.37049 4 9 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H9C8.37049 20 7.77771 19.7036 7.4 19.2L2.9 13.2C2.36667 12.4889 2.36667 11.5111 2.9 10.8L7.4 4.8Z"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          </g>
        </svg>
    </button>
  </div>
</template>
