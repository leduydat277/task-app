
import { create } from "zustand";

export interface Task {
  _id?: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "Low" | "Medium" | "High";
  tags: string[];
  status: "Not Started" | "In Progress" | "Completed";
  createdAt?: string;
  updatedAt?: string;
}

interface TaskEditorStore {
  currentTask: Task | null;
  setCurrentTask: (task: Task) => void;
  clearCurrentTask: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setDueDate: (dueDate: string) => void;
  setPriority: (priority: "Low" | "Medium" | "High") => void;
  setTags: (tags: string[]) => void;
  setStatus: (status: "Not Started" | "In Progress" | "Completed") => void;
}

export const useTaskEditorStore = create<TaskEditorStore>((set) => ({
  currentTask: null,
  setCurrentTask: (task) => set({ currentTask: task }),
  clearCurrentTask: () => set({ currentTask: null }),
  setTitle: (title: string) =>
    set((state) => ({
      currentTask: state.currentTask ? { ...state.currentTask, title } : null,
    })),
  setDescription: (description: string) =>
    set((state) => ({
      currentTask: state.currentTask ? { ...state.currentTask, description } : null,
    })),
  setDueDate: (dueDate: string) =>
    set((state) => ({
      currentTask: state.currentTask ? { ...state.currentTask, dueDate } : null,
    })),
  setPriority: (priority: "Low" | "Medium" | "High") =>
    set((state) => ({
      currentTask: state.currentTask ? { ...state.currentTask, priority } : null,
    })),
  setTags: (tags: string[]) =>
    set((state) => ({
      currentTask: state.currentTask ? { ...state.currentTask, tags } : null,
    })),
  setStatus: (status: "Not Started" | "In Progress" | "Completed") =>
    set((state) => ({
      currentTask: state.currentTask ? { ...state.currentTask, status } : null,
    })),
}));
