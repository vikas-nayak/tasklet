"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import TaskList from "@/components/taskList"
import TaskStatus from "@/components/taskStatus"
import CompletedTasks from "@/components/completedTasks"
import { useSession } from "next-auth/react"

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  dueDate: string;
  userId: number;
}

export default function Dashboard() {


  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const completedTasks = [
    {
      id: 4,
      title: "Walk the dog",
      description: "Take the dog to the park and make sure he eats as well",
      completedTime: "2 days ago",
      image: "",
    },
    {
      id: 5,
      title: "Conduct meeting",
      description: "Meet with the client and finalize requirements",
      completedTime: "3 days ago",
      image: "",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-6">Welcome back, {session ? session.user?.name : ""} 👋</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <TaskList tasks={tasks} onTaskCreated={fetchTasks} />
                </div>
                <div className="space-y-6">
                  <TaskStatus />
                  <CompletedTasks tasks={completedTasks} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

