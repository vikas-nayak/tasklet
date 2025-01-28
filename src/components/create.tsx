"use client";
import { useState } from "react";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          dueDate,
          //   userId, // Uncomment this line if you want to include userId
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Task created!`);
      } else {
        setMessage("Failed to create task");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl text-black font-semibold mb-6 text-center">Create Task</h1>
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

        {/* <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="userId">
            User ID (optional)
          </label>
          <input
            id="userId"
            type="number"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
            className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg text-gray-700">{message}</p>}
    </div>
    </div>
  );
};

export default CreateTask;
