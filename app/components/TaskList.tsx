
import { Card, ResourceList } from "@shopify/polaris";
import TaskItem from "./TaskItem";
type Task = {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    tags: string[];
    status: string;
};
export default function TaskList({ tasks }: { tasks: Task[] }) {



    return (
        <Card title="Danh sách công việc" sectioned>
            <ResourceList
                resourceName={{ singular: "task", plural: "tasks" }}
                items={tasks}
                renderItem={(task) => <TaskItem key={task.id} task={task} />}
            />
        </Card>
    );
}
