import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, default: () => new Date() },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium",
  },
  tags: {
    type: [String],
    enum: ["General", "Work", "Personal", "Urgent", "Other"],
    default: ["General"],
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
});

// Nếu model đã được tạo, dùng lại; nếu chưa, tạo mới.
const Task = mongoose.models.Task || mongoose.model("Task", schema, "task");

export default Task;
