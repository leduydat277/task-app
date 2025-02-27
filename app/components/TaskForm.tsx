
import React, { useEffect } from "react";
import { Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { useTaskEditorStore, Task } from "~/stores/useTaskStore";

interface TaskFormProps {
    initialTask: Task;
    onSubmit: (task: Task) => void;
    onClose: () => void;
}

export default function TaskForm({ initialTask, onSubmit, onClose }: TaskFormProps) {
    const {
        currentTask,
        setCurrentTask,
        clearCurrentTask,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setTags,
        setStatus,
    } = useTaskEditorStore();
    useEffect(() => {
        setCurrentTask(initialTask);
        return () => clearCurrentTask();
    }, [initialTask, setCurrentTask, clearCurrentTask]);

    if (!currentTask) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentTask);
        onClose();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormLayout>
                <TextField label="Tiêu đề" value={currentTask.title} onChange={setTitle} />
                <TextField
                    label="Mô tả"
                    value={currentTask.description || ""}
                    onChange={setDescription}
                    multiline
                />
                <TextField
                    label="Ngày hết hạn"
                    type="date"
                    value={currentTask.dueDate || ""}
                    onChange={setDueDate}
                />
                <TextField
                    label="Độ ưu tiên"
                    value={currentTask.priority}
                    onChange={(value) => setPriority(value as "Low" | "Medium" | "High")}
                />
                <TextField
                    label="Tags"
                    value={currentTask.tags}
                    onChange={(value) =>
                        setTags(
                            value
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter(Boolean)
                        )
                    }
                />
                <TextField
                    label="Trạng thái"
                    value={currentTask.status}
                    onChange={(value) =>
                        setStatus(value as "Not Started" | "In Progress" | "Completed")
                    }
                />
                <Button submit primary>
                    Lưu thay đổi
                </Button>
            </FormLayout>
        </Form>
    );
}
