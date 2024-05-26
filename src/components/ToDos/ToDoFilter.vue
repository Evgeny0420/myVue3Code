<script
  setup
  lang="ts"
>
const inputValue = defineModel<string>("inputValue");

function clear() {
  inputValue.value = "";
}
</script>

<template>
  <div class="flex border">
    <input
      type="text"
      class="w-full border-0 px-4 py-2"
      v-model="inputValue"
      placeholder="Enter filter text here..."
    />
    <button
      class="p-2 border-0 bg-slate-200 hover:bg-slate-300"
      @click="clear()"
    >
      <svg
        class="w-7 h-7 fill-none"
        viewBox="0 0 24 24"
      >
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
      </svg>
    </button>
  </div>
</template>
