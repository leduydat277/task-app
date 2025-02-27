
import { json } from "@remix-run/node";
import Task from "~/models/Task.server";

export const action = async ({ params }) => {
    const { taskId } = params;

    try {
        await Task.findByIdAndDelete(taskId);
        return json({ success: true });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
};
