import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import Image from "next/image";
import TaskFormModal from "./taskForm";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: string;
  dueDate?: string;
  image: string;
  userId: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskCreated: () => void;
}

export default function TaskList({ onTaskCreated }: TaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks/get?userId=1");
      const data = await res.json();
      if (res.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      const res = await fetch(`/api/tasks/delete/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Task deleted successfully");
        setTimeout(() => setMessage(""), 3000);
        await fetchTasks();
      } else {
        setMessage("Failed to delete task");
      }
    } catch (error) {
      setMessage("Error deleting task");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/tasks/update/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (res.ok) {
        setMessage("Status updated");
        setTimeout(() => setMessage(""), 2000);
        await fetchTasks();
      }
    } catch (error) {
      setMessage("Failed to update status");
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <CardTitle className="text-gray-500">Tasks</CardTitle>
        <Button
          size="sm"
          className="bg-[#FF5D5D] hover:bg-[#ff4444] text-white gap-1"
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>

      <CardContent className="p-4">
        {message && (
          <div className={`mb-3 p-2 ${message.includes("Failed") ? "text-[#ff4444]" : "text-gray-500"}`}>
            {message}
          </div>
        )}

        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">{task.title}</h3>
                  <span className="text-[#FF5D5D] text-sm">
                    Priority: {task.priority}
                  </span>
                </div>

                <p className="text-gray-500 mr-20 text-sm mb-2">{task.description}</p>

                <div className="flex items-center text-gray-500 text-sm">
                  <span>{task.status}</span>
                  {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>

                <div className="flex gap-2 mt-2">
                  <Select
                    value={task.status}
                    onValueChange={(value) => handleStatusChange(task.id, value)}
                  >
                    <SelectTrigger className="w-[120px] border-gray-300 text-gray-600 text-xs h-8">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-300">
                      <SelectItem value="Todo" className="text-xs text-gray-600">Completed</SelectItem>
                      <SelectItem value="In Progress" className="text-xs text-gray-600">In Progress</SelectItem>
                      <SelectItem value="Done" className="text-xs text-gray-600">Not Started</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    onClick={() => handleEdit(task)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-[#ff4444] hover:bg-red-50"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onTaskCreated={() => {
          fetchTasks();
          onTaskCreated();
        }}
        editingTask={editingTask}
      />
    </Card>
  );
}