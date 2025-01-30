import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface CompletedTask {
  id: number
  title: string
  description: string
  completedTime: string
  image: string
}

export default function CompletedTasks({ tasks }: { tasks: CompletedTask[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Completed Task</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                <p className="text-xs text-gray-400 mt-2">Completed {task.completedTime}</p>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="https://avatars.githubusercontent.com/u/124599?v=10"
                  alt="Task thumbnail"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

