
import { useState } from "react";
import { Plus, Search, Calendar, CheckCircle, Clock, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Assignment {
  id: number;
  family: string;
  temple: string;
  dana: string;
  date: string;
  isConfirmed: boolean;
  confirmationDate?: string;
}

export const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      family: "Silva Family",
      temple: "Sri Maha Bodhi Temple",
      dana: "Morning Dana",
      date: "2024-12-24",
      isConfirmed: true,
      confirmationDate: "2024-12-20"
    },
    {
      id: 2,
      family: "Perera Family",
      temple: "Temple of Peace",
      dana: "Evening Dana",
      date: "2024-12-25",
      isConfirmed: false
    },
    {
      id: 3,
      family: "Fernando Family",
      temple: "Sri Maha Bodhi Temple",
      dana: "Special Dana",
      date: "2024-12-26",
      isConfirmed: true,
      confirmationDate: "2024-12-21"
    },
    {
      id: 4,
      family: "Wijesinghe Family",
      temple: "Temple of Peace",
      dana: "Afternoon Dana",
      date: "2024-12-27",
      isConfirmed: false
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const userRole = localStorage.getItem("userRole");

  const filteredAssignments = assignments.filter(assignment =>
    assignment.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.temple.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.dana.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmAssignment = (id: number) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id 
        ? { ...assignment, isConfirmed: true, confirmationDate: new Date().toISOString().split('T')[0] }
        : assignment
    ));
  };

  const handleDeleteAssignment = (id: number) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
  };

  const canDelete = userRole === "admin" || userRole === "headmonk" || userRole === "helper";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Assignment Management</h2>
          <p className="text-gray-600 mt-1">Manage dana assignments and schedules</p>
        </div>
        <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-sm sm:text-base px-4 py-2 h-10 sm:h-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-purple-800 text-sm sm:text-base">{assignment.family}</span>
                        </div>
                        <Badge 
                          variant={assignment.isConfirmed ? "default" : "secondary"}
                          className={`${assignment.isConfirmed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} text-xs`}
                        >
                          {assignment.isConfirmed ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirmed
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </>
                          )}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
                        <div>
                          <p className="text-gray-500">Temple</p>
                          <p className="font-medium">{assignment.temple}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Dana Type</p>
                          <p className="font-medium">{assignment.dana}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-medium flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(assignment.date).toLocaleDateString()}
                          </p>
                        </div>
                        {assignment.confirmationDate && (
                          <div>
                            <p className="text-gray-500">Confirmed On</p>
                            <p className="font-medium">{new Date(assignment.confirmationDate).toLocaleDateString()}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-row sm:flex-col lg:flex-row gap-2 w-full sm:w-auto">
                      {!assignment.isConfirmed && (
                        <Button 
                          size="sm" 
                          onClick={() => handleConfirmAssignment(assignment.id)}
                          className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-3 py-2 h-8 sm:h-9"
                        >
                          Confirm
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 sm:flex-none text-xs sm:text-sm px-3 py-2 h-8 sm:h-9"
                      >
                        Edit
                      </Button>
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm px-2 sm:px-3 py-2 h-8 sm:h-9"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="w-[90vw] max-w-md mx-auto">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-base sm:text-lg">Delete Assignment</AlertDialogTitle>
                              <AlertDialogDescription className="text-sm">
                                Are you sure you want to delete this assignment for {assignment.family}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                              <AlertDialogCancel className="w-full sm:w-auto text-sm">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteAssignment(assignment.id)}
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-sm"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
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
