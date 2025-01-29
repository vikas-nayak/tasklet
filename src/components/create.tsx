"use client";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  dueDate: string;
  userId: number;
}

const CreateTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const isEditing = editingTask !== null;
    const url = isEditing 
      ? `/api/tasks/update/${editingTask}`
      : "/api/tasks/create";
    const method = isEditing ? "PUT" : "POST";

    try {
      const body = JSON.stringify({
        title,
        description,
        priority,
        dueDate,
        userId: 1,
      });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(isEditing ? "Task updated!" : "Task created!");
        await fetchTasks();
        resetForm();
      } else {
        setMessage("Failed to save task");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      const res = await fetch(`/api/tasks/delete/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Task deleted");
        await fetchTasks();
      } else {
        setMessage("Failed to delete task");
      }
    } catch (error) {
      setMessage("Error deleting task");
    }
  };


  const handleEdit = (task: Task) => {
    setEditingTask(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate);
  };

  const resetForm = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setPriority(1);
    setDueDate("");
  };

  return (
    <div className="flex justify-center items-start h-screen pt-10">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl text-black font-semibold mb-6 text-center">
            {editingTask ? "Edit Task" : "Create Task"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="priority">
                Priority
              </label>
              <input
                id="priority"
                type="number"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
                required
              />
            </div>

            {message && <p className="mt-4 text-center text-lg text-gray-700">{message}</p>}

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
              disabled={loading}
            >
              {loading ? (editingTask ? "Updating..." : "Creating...") : editingTask ? "Update Task" : "Create Task"}
            </button>
          </form>
        </div>

        {message && <p className="text-center text-lg text-gray-700 mb-4">{message}</p>}

        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Your Tasks</h2>
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 mb-4 rounded shadow">
              <h3 className="text-lg font-medium text-black">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-500">
                  Priority: {task.priority} | Due: {task.dueDate} | Id: {task.id}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(task)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
