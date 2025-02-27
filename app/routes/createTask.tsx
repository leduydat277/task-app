import React from "react";
import { Page } from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import TaskForm from "~/components/TaskForm";
import type { Task } from "~/stores/useTaskStore";

export default function NewTask() {
  const navigate = useNavigate();
  const initialTask: Task = {
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    tags: [],
    status: "Not Started",
  };

  const handleSubmit = async (newTask: Task) => {
    try {
      const response = await fetch(`/api/tasks/createTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        console.error("Lỗi tạo task trên server:", await response.text());
        return;
      }

      const result = await response.json();
      console.log("Task tạo mới thành công:", result.task);
      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Page title="Thêm Task mới">
      <TaskForm
        initialTask={initialTask}
        onSubmit={handleSubmit}
        onClose={() => navigate("/")}
      />
    </Page>
  );
}
