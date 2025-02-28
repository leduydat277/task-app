
import { json } from "@remix-run/node";
import { ClientActionFunctionArgs } from "@remix-run/react";

import Task from "~/models/Task.server";

export const action = async ({ params, request }: ClientActionFunctionArgs) => {
  const { taskId } = params;
  const formData = await request.json();
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, formData, { new: true }).lean();
    return json({ success: true, task: updatedTask });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
};