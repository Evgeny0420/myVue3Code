<script
  setup
  lang="ts"
>
import { ref, inject, onMounted, watch } from "vue";

import { useRouter } from "vue-router";
import ToDoItemForm from "../components/ToDos/ToDoItemForm.vue";
import ToDoList from "../components/ToDos/ToDoList.vue";
import ToDoFilter from "../components/ToDos/ToDoFilter.vue";
import ToDoSummary from "../components/ToDos/ToDoSummary.vue";
import todoService from "../services/todo";
import eventBus from "../services/eventBus";

import { Modals } from "../types/Modals";
import { ToDoItem } from "../types/ToDoItem";

const $props = defineProps(["id"]);
const $modals = inject<Modals>("$modals");
const $router = useRouter();
const _filter = ref<string>("");
const _item = ref<ToDoItem>(todoService.getDefault());
const _items = ref<Array<ToDoItem>>([]);
const _project_name = ref<string>("");

onMounted(loadProject);

watch(() => $props.id, loadProject);

function showModal (new_item: boolean = true, item: ToDoItem = todoService.getDefault()) {
  _item.value = new_item ? todoService.getDefault() : todoService.makeCopy(item);

  $modals?.show("newEditItem")
  .then(() => {
    if (new_item) {
      _items.value.push(_item.value);
    } else {
      let index = getIndex(item);
      if (index >= 0) {
        _items.value[index] = _item.value;
      } else {
        alert("Error updating the item");
      }
    }
    saveProject();
  }, () => {});
}

function deleteItem (item: ToDoItem): void {
  $modals?.show("deleteItem")
  .then(() => {
    let index = getIndex(item);
    if (index >= 0) {
      _items.value.splice(index, 1);
      saveProject();
    }
  }, () => {});
}

function getIndex (item: ToDoItem): number {
  let index = _items.value.findIndex(it => it.id === item.id);
  return index === -1 ? 0 : index;
}

function toggleStatus (item: ToDoItem): void {
  item.status = todoService.toggleStatus(item.status);
  saveProject();
}

function deleteProject () {
  $modals?.show("deleteProject")
    .then(() => {
      todoService.deleteProject($props.id);
      eventBus.emit("#UpdateProjects");
      $router.push({ name: "landing" });
    }, () => {});
}

function loadProject () {
  _project_name.value = todoService.getProjectName($props.id);
  _items.value = todoService.loadProject($props.id);
}

function saveProject () {
  todoService.saveProject($props.id, _items.value);
}
</script>

<template>
  <div class=" max-w-4xl p-4 mx-auto">
    <div class="flex justify-between content-center items-center mb-2">
      <h1>
        {{ _project_name }}
      </h1>
      <button
        class="bg-blue-500 rounded-lg p-2 text-white hover:shadow-lg hover:shadow-neutral-400 transform hover:-translate-y-[2px] transition duration-300"
        @click="deleteProject()"
      >
        Delete project
      </button>
    </div>
    <ToDoSummary
      :items="_items"
      class="mb-4"
    />
    <div class="mb-4">
      <ToDoFilter
        v-model:inputValue="_filter"
        class="flex-grow"
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
        class="flex flex-row gap-1 p-2 bg-blue-500 rounded-lg text-white hover:shadow-lg hover:shadow-neutral-400 transform hover:-translate-y-[2px] transition duration-300"
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
    </TodoList>

    <Modal
      name="newEditItem"
      title="To Do Item"
    >
      <ToDoItemForm v-model:item="_item" />
    </Modal>

    <Modal
      name="deleteItem"
      title="Delete To-Do Item"
    >
      <p>
        This action will delete the item:<br />
        <strong>
          {{ _item.text }}
        </strong>
      </p>
      <p class="text-red-500 bg-pink-300">
        This action cannot be undone.
      </p>
    </Modal>

    <Modal
      name="deleteProject"
      title="Delete the Project"
    >
      <h3>
        Attention
      </h3>
      <p class="bg-pink-300 text-red-500 py-2 px-4">
        This action cannot be undone. Please confirm.
      </p>
    </Modal>
  </div>
</template>
