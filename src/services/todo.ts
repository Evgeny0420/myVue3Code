import { ToDoItem } from '../types/ToDoItem'

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
  validateTodo (item: ToDoItem): boolean{
    return item.text.length > 0;
  },
  makeCopy (item: ToDoItem): ToDoItem{
    return JSON.parse(JSON.stringify(item))
  },
  toggleStatus (status: string) {
    switch (status) {
      case "not_started":
        return "in_progress"
      case "in_progress":
        return "completed"
      case "completed":
        return "not_started"
      default:
        return ""
    }
  }
}

export default service;
