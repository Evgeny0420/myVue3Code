import { ToDoItem } from "../types/ToDoItem";
import { Projects } from "../types/Projects";

const service = {
  getDefault (): ToDoItem {
    return {
      id: `${Date.now().toString(16)}_${Math.ceil(Math.random()*1000).toString(16)}`,
      text: "",
      status: "not_started"
    }
  },
  getStatusList (): Array<Record<string, string>> {
    return [
      { id: "not_started", label: "Not started" },
      { id: "in_progress", label: "In progress" },
      { id: "completed", label: "Completed" }
    ]
  },
  validateTodo (item: ToDoItem): boolean {
    return item.text.length > 0;
  },
  makeCopy (item: ToDoItem): ToDoItem {
    return JSON.parse(JSON.stringify(item));
  },
  toggleStatus (status: string) {
    switch (status) {
      case "not_started":
        return "in_progress";
      case "in_progress":
        return "completed";
      case "completed":
        return "not_started";
      default: 
        return "";
    }
  },
  createTodoProject (name: string = ""): void {
    let projects: Projects = service.loadProjectsManifest();
    let project_id = projects.next_id;

    projects.next_id++;
    projects.list.push({ id: project_id, name });
    localStorage.setItem(`project.${project_id}`, "[]");

    service.saveProjectsManifest(projects);
  },
  loadProjectsManifest (): Projects {
    const defaultProjects = { next_id: 0, list: [] };
    const storedProjects = localStorage.getItem("projects");

    return storedProjects ? JSON.parse(storedProjects) : defaultProjects;
  },
  saveProjectsManifest (projects: Projects): void {
    localStorage.setItem("projects", JSON.stringify(projects));
  },
  deleteProject (project_id: number): void {
    let manifest = service.loadProjectsManifest(),
      project_index = manifest.list.findIndex(p => p.id == project_id);

    if (project_index > -1) {
      manifest.list.splice(project_index, 1);
      service.saveProjectsManifest(manifest);
      localStorage.removeItem(`project.${project_id}`);
    }
  },
  loadProject (project_id: number): ToDoItem {
    const localProjectData = localStorage.getItem(`project.${project_id}`);

    return localProjectData ? JSON.parse(localProjectData) : '';
  },
  saveProject (project_id: number, data: any): void {
    localStorage.setItem(`project.${project_id}`, JSON.stringify(data));
  },
  getProjectName (project_id: number): string {
    let manifest = service.loadProjectsManifest(),
    project = manifest.list.find(p => p.id == project_id);

    return project ? project.name : "";
  },
};

export default service;
