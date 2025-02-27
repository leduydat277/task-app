import { useState } from "react";
import { ResourceItem, Text, Button, Badge, BlockStack, InlineStack, Modal } from "@shopify/polaris";
import TaskEdit from "./TaskEdit";

export default function TaskItem({ task }: { task: any }) {

    const [isEditing, setIsEditing] = useState(false);

    const getPriorityBadgeStatus = () => {
        switch (task.priority) {
            case "High":
            case "Urgent":
                return "critical";
            case "Medium":
                return "warning";
            default:
                return "info";
        }
    };

    const getStatusBadgeStatus = () => {
        return task.status === "Completed" ? "success" : "warning";
    };

    return (
        <>
            <ResourceItem id={task._id} accessibilityLabel={`View details for ${task.title}`}>
                <BlockStack spacing="loose">
                    <BlockStack vertical spacing="tight">
                        <Text variant="headingMd" as="h3">{task.title}</Text>
                        <Text>{task.description}</Text>
                    </BlockStack>

                    <BlockStack gap="4">
                        <Badge status={getPriorityBadgeStatus()}>{task.priority}</Badge>
                        <Badge status={getStatusBadgeStatus()}>{task.status}</Badge>
                        {Array.isArray(task.tags)
                            ? task.tags.map((tag: string, index: number) => (
                                <Badge key={index}>{tag}</Badge>
                            ))
                            : <Badge>{task.tags}</Badge>
                        }
                    </BlockStack>

                    <InlineStack gap="4">
                        <Button destructive onClick={() => deleteTask(task._id)}>Xóa</Button>
                        <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
                    </InlineStack>
                </BlockStack>
            </ResourceItem>

            {isEditing && (
                <Modal open={isEditing} onClose={() => setIsEditing(false)} title="Chỉnh sửa công việc">
                    <Modal.Section>
                        <TaskEdit task={task} onClose={() => setIsEditing(false)} />
                    </Modal.Section>
                </Modal>
            )}
        </>
    );
}
