
import TaskForm from "~/components/TaskForm";
import type { Task } from "~/stores/useTaskStore";

interface TaskEditProps {
  task: Task;
  onClose: () => void;
}

export default function TaskEdit({ task, onClose }: TaskEditProps) {
  const handleSubmit = async (updatedTask: Task) => {
    const taskId = updatedTask._id || updatedTask.id;
    if (!taskId) {
      console.error("Task ID is undefined");
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        console.error("Lỗi cập nhật task trên server:", await response.text());
        return;
      }

      const result = await response.json();
      console.log("Task cập nhật thành công:", result.task);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <TaskForm initialTask={task} onSubmit={handleSubmit} onClose={onClose} />
  );
}
