<script
  setup
  lang="ts"
>
import { computed } from "vue";
import { ToDoItem } from "../../types/ToDoItem";

const $props = defineProps({
  "modelValue": {
    type: Array<ToDoItem>,
    default: () => []
  },
  "filter":{
    type: String,
    default: ""
  },
});

const $emit = defineEmits(["edit", "delete", "toggle"]);

const _filtered_list = computed(() => $props.filter ? $props.modelValue.filter(item => item.text.toUpperCase().includes($props.filter.toUpperCase())) : $props.modelValue);

function emitEvent (event_name: any, payload: any) {
  $emit(event_name, payload)
}
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 py-1 justify-start items-center  border-b border-t font-semibold">
      <span class="min-w-20 flex justify-center items-center">
        Status
      </span>
      <span class="w-full">
        Item
      </span>
      <div class="min-w-36 text-right">
        <slot />
      </div>
    </div>
    <div
      class="flex gap-2 py-1 justify-start items-center"
      v-for="item in _filtered_list"
      :key="item.id"
    >
      <div
        class="cursor-pointer min-w-20 flex justify-center items-center"
        @click="emitEvent('toggle', item)"
      >
        <svg
          v-if="item.status=='not_started'"
          class="w-7 h-7 fill-slate-400"
          viewBox="0 0 448 512"
        >
          <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM400 432H48V80h352v352z"/>
        </svg>
        <svg
          v-if="item.status=='in_progress'"
          class="w-7 h-7 fill-teal-500"
          viewBox="0 0 448 512"
        >
          <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM328 272H120c-13.25 0-24-10.75-24-24v-16c0-13.25 10.75-24 24-24h208c13.25 0 24 10.75 24 24v16c0 13.25-10.75 24-24 24z"/>
        </svg>
        <svg
          v-if="item.status=='completed'"
          class="w-7 h-7 fill-green-600"
          viewBox="0 0 448 512"
        >
          <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-28.49 159.5l-184 184c-4.69 4.69-12.28 4.69-16.97 0l-104-104c-4.69-4.69-4.69-12.28 0-16.97l28.28-28.28c4.69-4.69 12.28-4.69 16.97 0L192 284.51l139.54-139.54c4.69-4.69 12.28-4.69 16.97 0l28.28 28.28c4.69 4.68 4.69 12.28 0 16.96z"/>
        </svg>
      </div>
      <div class="w-full">
        {{ item.text }}
      </div>
      <div class="text-right flex min-w-36">
        <span
          class="flex cursor-pointer gap-1 text-indigo-600 hover:text-blue-600 hover:border-gray-200 rounded p-1"
          @click="emitEvent('edit',item)"
        >
          <svg
            class="fill-current w-5 h-5"
            viewBox="0 0 448 512"
          >
            <path d="M362.7 19.3c25-25 65.5-25 90.5 0l17.4 17.4c25 25 25 65.5 0 90.5L144 453.8c-7.6 7.6-17.2 13.4-27.7 16.3L27 504.6c-5.7 1.5-11.8-.3-16-4.6s-6.1-10.3-4.6-16l34.5-89.3c2.9-10.5 8.7-20.1 16.3-27.7L362.7 19.3zM284.9 166.7L127.3 324.3l60.4 60.4L345.3 227l-60.4-60.3zM400 160h-16V96c0-26.5-21.5-48-48-48H112c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48v-64h16c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16z"/>
          </svg>
          Edit
        </span>
        <span
          class="flex cursor-pointer gap-1 text-purple-600 hover:text-red-600 hover:border-gray-200 rounded p-1"
          @click="emitEvent('delete',item)"
        >
          <svg
            class="fill-current w-5 h-5"
            viewBox="0 0 448 512"
          >
            <path d="M135.168 34.052C137.825 14.116 154.63 0 174.988 0H273.012c20.358 0 37.163 14.116 39.82 34.052L319.855 48H432c8.837 0 16 7.163 16 16s-7.163 16-16 16H408.017l-27.642 390.986c-1.817 25.667-23.353 45.014-49.07 45.014H116.695c-25.717 0-47.253-19.347-49.07-45.014L39.982 80H16c-8.837 0-16-7.163-16-16s7.163-16 16-16H128.145l7.023-13.948zM177.26 48l-2.144 16H273.884l-2.144-16H177.26zM97.159 464h253.681l27.263-384H69.897l27.263 384z" />
          </svg>
          Delete
        </span>
      </div>
    </div>
    <div
      v-if="_filtered_list.length === 0"
      class="flex gap-2 py-1 justify-start items-center"
    >
      <svg
        class="fill-current w-5 h-5 min-w-20"
        viewBox="0 0 448 512"
      >
        <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48z"/>
      </svg>
      <div
        class="flex items-center gap-1 w-full"
      >
        The list is empty.
      </div>
    </div>
  </div>
</template>