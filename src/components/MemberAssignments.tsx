
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, CheckCircle } from "lucide-react";

interface Assignment {
  id: number;
  templeName: string;
  danaType: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "confirmed";
}

export const MemberAssignments = () => {
  const [assignments] = useState<Assignment[]>([
    {
      id: 1,
      templeName: "Sacred Heart Temple",
      danaType: "Morning Dana",
      date: "2024-01-15",
      time: "MORNING",
      location: "Main Hall",
      status: "upcoming"
    },
    {
      id: 2,
      templeName: "Golden Lotus Temple",
      danaType: "Evening Dana",
      date: "2024-01-20",
      time: "EVENING",
      location: "Prayer Hall",
      status: "confirmed"
    },
    {
      id: 3,
      templeName: "Sacred Heart Temple",
      danaType: "Special Dana",
      date: "2024-01-10",
      time: "MORNING",
      location: "Main Hall",
      status: "completed"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "confirmed": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeColor = (time: string) => {
    switch (time) {
      case "MORNING": return "bg-yellow-100 text-yellow-800";
      case "AFTERNOON": return "bg-orange-100 text-orange-800";
      case "EVENING": return "bg-purple-100 text-purple-800";
      case "NIGHT": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Dana Assignments</h2>
        <p className="text-gray-600 mt-1">View your upcoming and completed dana assignments</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-orange-800">
                  {assignment.templeName}
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </Badge>
                  <Badge className={getTimeColor(assignment.time)}>
                    <Clock className="h-3 w-3 mr-1" />
                    {assignment.time}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Dana Type</p>
                <p className="text-sm font-medium">{assignment.danaType}</p>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(assignment.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {assignment.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
