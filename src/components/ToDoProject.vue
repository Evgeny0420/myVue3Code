<script
  setup
  lang="ts"
>
import { ref, inject } from "vue";

import ToDoItemForm from "./ToDoItemForm.vue";
import ToDoList from "./ToDoList.vue";
import ToDoFilter from "./ToDoFilter.vue";
import ToDoSummary from "./ToDoSummary.vue";
import todoService from "../services/todo";

import { ToDoItem } from "../types/ToDoItem";
import { Modals } from "../types/Modals";

const $modals = inject<Modals>("$modals");
const _filter = ref<string>("");
const _item = ref<ToDoItem>(todoService.getDefault());
const _items = ref<Array<ToDoItem>>([]);

function showModal(newItem: boolean = true, item: ToDoItem = todoService.getDefault()) {
  _item.value = newItem ? todoService.getDefault() : todoService.makeCopy(item);

  $modals?.show("newEditItem").then(() => {
    if (newItem) {
      _items.value.push(_item.value);
    } else {
      let index = getIndex(item);
      if (index >= 0) {
        _items.value[index] = _item.value;
      } else {
        alert("Error updating the item");
      }
    }
  }, () => {});
}

function deleteItem(item: ToDoItem) {
  $modals?.show("deleteItem").then(() => {
    let index = getIndex(item);
    if (index >= 0) {
      _items.value.splice(index, 1);
    }
  }, () => {});
}

function getIndex (item: ToDoItem): number {
  let index = _items.value.findIndex(it => it.id == item.id);
  return index === -1 ? 0 : index;
}

function toggleStatus(item: ToDoItem) {
  item.status = todoService.toggleStatus(item.status);
}
</script>

<template>
  <div class="mx-auto p-4 max-w-56rem">
    <ToDoSummary
      class="mb-4"
      :items="_items" 
    />
    <div class="mb-4">
      <ToDoFilter
        class="flex-grow"
        v-model:inputValue="_filter"
      />
    </div>
    <ToDoList 
      v-model="_items" 
      :filter="_filter" 
      @toggle="toggleStatus"
      @edit="showModal(false, $event)" 
      @delete="deleteItem"
    >
      <button
        class="border-none inline-flex gap-1 px-4 py-2 justify-center items-center bg-blue-500 rounded-2xl text-white hover:bg-blue-400"
        @click="showModal(true)"
      >
        <svg
          class="w-6 h-6 fill-current"
          viewBox="0 0 448 512"
        >
          <path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96C448 60.65 419.3 32 384 32zM320 272H240v80C240 362.5 234.5 368 228 368h-8C213.5 368 208 362.5 208 356V272H128C121.5 272 116 266.5 116 260v-8C116 245.5 121.5 240 128 240h80V160C208 153.5 213.5 148 220 148h8C234.5 148 240 153.5 240 160v80H320C326.5 240 332 245.5 332 252v8C332 266.5 326.5 272 320 272z" />
        </svg>
        New item
      </button>
    </ToDoList>
    <Modal
      name="newEditItem"
      title="To Do Item"
    >
      <ToDoItemForm
        v-model:item="_item"
      />
    </Modal>
    <Modal
      name="deleteItem"
      title="Delete To-Do Item"
    >
      <p>
        This action will delete the item:<br>
        <strong>
          {{ _item.text }}
        </strong>
      </p>
      <p class="w3-text-red w3-pale-red">
        This action cannot be undone.
      </p>
    </Modal>
  </div>
</template>
