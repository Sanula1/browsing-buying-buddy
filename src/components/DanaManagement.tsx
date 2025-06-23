
import { useState } from "react";
import { Plus, Search, Edit, Trash, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Dana {
  id: number;
  name: string;
  description: string;
  time: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";
}

export const DanaManagement = () => {
  const [danas, setDanas] = useState<Dana[]>([
    {
      id: 1,
      name: "Morning Dana",
      description: "Traditional morning offering with breakfast and tea",
      time: "MORNING"
    },
    {
      id: 2,
      name: "Afternoon Dana",
      description: "Midday meal offering for the monks",
      time: "AFTERNOON"
    },
    {
      id: 3,
      name: "Evening Dana",
      description: "Evening prayers and light refreshments",
      time: "EVENING"
    },
    {
      id: 4,
      name: "Special Dana",
      description: "Special occasion offerings and ceremonies",
      time: "MORNING"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDanas = danas.filter(dana =>
    dana.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dana.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dana Management</h2>
          <p className="text-gray-600 mt-1">Manage dana types and schedules</p>
        </div>
        <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-sm sm:text-base px-4 py-2 h-10 sm:h-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Dana Type
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search dana types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDanas.map((dana) => (
              <Card key={dana.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base sm:text-lg text-red-800 flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      {dana.name}
                    </CardTitle>
                    <Badge className={`${getTimeColor(dana.time)} text-xs`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {dana.time}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Description</p>
                    <p className="text-xs sm:text-sm font-medium">{dana.description}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs sm:text-sm px-3 py-2 h-8 sm:h-9">
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 text-xs sm:text-sm px-3 py-2 h-8 sm:h-9">
                      <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
