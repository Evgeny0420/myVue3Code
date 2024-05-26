<script
  setup
  lang="ts"
>
import { inject, ref } from "vue";
import eventBus from "../services/eventBus";
import todoService from "../services/todo";
import { Modals } from "../types/Modals";

const $modals = inject<Modals>("$modals");
const _project_name = ref<string>("");

function newProject() {
  _project_name.value = "";

  $modals?.show("#NewProject")
    .then(() => {
      if (_project_name.value !== "") {
        todoService.createTodoProject(_project_name.value);
        eventBus.emit("#UpdateProjects");
      }
    }, () => {});
}
</script>

<template>
  <div class="p-40 mx-auto min-w-[40rem] max-w-[60rem] flex flex-col gap-3">
    <span class="border-b-8 border-b-slate-400 inline-flex gap-x-2 items-center text-4xl w-full pb-2">
      <svg class="w-10 h-10 fill-purple-600" viewBox="0 0 24 24">
        <path d="M2,11H8a1,1,0,0,0,1-1V4A1,1,0,0,0,8,3H2A1,1,0,0,0,1,4v6A1,1,0,0,0,2,11ZM3,5H7V9H3ZM23,7a1,1,0,0,1-1,1H12a1,1,0,0,1,0-2H22A1,1,0,0,1,23,7Zm0,10a1,1,0,0,1-1,1H12a1,1,0,0,1,0-2H22A1,1,0,0,1,23,17ZM3.235,19.7,1.281,17.673a1,1,0,0,1,1.438-1.391l1.252,1.3L7.3,14.289A1,1,0,1,1,8.7,15.711l-4.046,4a1,1,0,0,1-.7.289H3.942A1,1,0,0,1,3.235,19.7Z" />
      </svg>
      Landing page
    </span>
    <p>
      You can create a new project or select one from the sidebar.
    </p>
    <p>
      This route was defined as static in our router.
    </p>
    <button
      class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-neutral-400 transform hover:-translate-y-[2px] transition duration-300"
      @click="newProject()"
    >
      New project
    </button>
    <Modal
      name="#NewProject"
      title="New To-Do Project"
    >
      <strong>
        Name
      </strong>
      <input
        type="text"
        class="p-2 block"
        placeholder="Enter project name..."
        v-model="_project_name"
      />
    </Modal>
  </div>
</template>
