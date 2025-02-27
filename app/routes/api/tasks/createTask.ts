
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import Task from "~/models/Task.server";

export const action: ActionFunction = async ({ request }) => {


    if (request.method === "POST") {
        try {
            const data = await request.json();
            const newTask = await Task.create(data);
            return json({ task: newTask });
        } catch (error: any) {
            return json({ error: error.message }, { status: 500 });
        }
    }

    return json({ error: "Method not allowed" }, { status: 405 });
};
