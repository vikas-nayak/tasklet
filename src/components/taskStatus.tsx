import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TaskStatus() {
  const statuses = [
    { label: "Completed", percentage: 84, color: "#34C759" },
    { label: "In Progress", percentage: 46, color: "#007AFF" },
    { label: "Not Started", percentage: 13, color: "#FF3B30" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Task Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {statuses.map((status) => (
            <div key={status.label} className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-20 h-20">
                  <circle
                    className="text-gray-200"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                  />
                  <circle
                    className="text-blue-600"
                    strokeWidth="5"
                    strokeDasharray={30 * 2 * Math.PI}
                    strokeDashoffset={30 * 2 * Math.PI * (1 - status.percentage / 100)}
                    strokeLinecap="round"
                    stroke={status.color}
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                  />
                </svg>
                <span className="absolute text-sm font-semibold" style={{ color: status.color }}>
                  {status.percentage}%
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{status.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

