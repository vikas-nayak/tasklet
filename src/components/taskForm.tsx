"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskCreated: () => void;
    editingTask?: {
        id: number;
        title: string;
        description: string;
        priority: number;
        dueDate?: string;
        userId: number;
    } | null;
}

const TaskFormModal = ({ isOpen, onClose, onTaskCreated, editingTask }: TaskFormModalProps) => {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setDueDate(editingTask.dueDate || "");
        } else {
            resetForm();
        }
    }, [editingTask]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const taskData = { title, description, priority, dueDate, userId: 1 };
            const url = editingTask ? `/api/tasks/update/${editingTask.id}` : "/api/tasks/create";
            const method = editingTask ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            if (res.ok) {
                setMessage(editingTask ? "Task updated!" : "Task created!");
                onTaskCreated();
                resetForm();
                onClose();
            } else {
                setMessage("Failed to save task");
            }
        } catch (error) {
            setMessage("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority(1);
        setDueDate("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="text-gray-500">
                        {editingTask ? "Edit Task" : "New Task"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <div>
                            <Label className="text-gray-500">Title</Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border-gray-300 text-gray-600"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-500">Description</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border-gray-300 text-gray-600"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-gray-500">Priority</Label>
                                <Select
                                    value={priority.toString()}
                                    onValueChange={(value) => setPriority(Number(value))}
                                >
                                    <SelectTrigger className="border-gray-300 text-gray-600">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent className="border-gray-300">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <SelectItem key={num} value={num.toString()} className="text-gray-600">
                                                {num}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-gray-500">Due Date</Label>
                                <Input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="border-gray-300 text-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {message && (
                        <p className={`text-sm ${message.includes("Failed") ? "text-[#ff4444]" : "text-gray-500"}`}>
                            {message}
                        </p>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#FF5D5D] hover:bg-[#ff4444] text-white"
                        >
                            {loading ? "Saving..." : editingTask ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskFormModal;