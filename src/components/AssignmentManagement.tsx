
import { useState } from "react";
import { Plus, Search, Calendar, CheckCircle, Clock, Users, Trash2, Building, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  templeDana: {
    templeId: {
      id: number;
      name: string;
      address: string;
      contactNumber: string;
      email: string;
      website: string;
    };
    dana: {
      id: number;
      name: string;
      description: string;
      time: string;
    };
    minNumberOfFamilies: number;
    assignments: Array<{
      id: number;
      family: {
        id: number;
        familyName: string;
        address: string;
        telephone: string;
      };
      date: string;
      isConfirmed: boolean | null;
      confirmationDate: string;
    }>;
  };
  family: {
    id: number;
    familyName: string;
    address: string;
    telephone: string;
  };
  date: string;
  isConfirmed: boolean | null;
  confirmationDate: string;
}

export const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      templeDana: {
        templeId: {
          id: 1,
          name: "Sri Vajiraramaya",
          address: "Maligawatta Temple Road",
          contactNumber: "0112695161",
          email: "vajiraramaya@temple.lk",
          website: "www.vajiraramaya.lk"
        },
        dana: {
          id: 1,
          name: "Morning Heel Dana",
          description: "Early morning rice offering",
          time: "MORNING"
        },
        minNumberOfFamilies: 5,
        assignments: [
          {
            id: 1,
            family: {
              id: 1,
              familyName: "Perera Family",
              address: "No 123, Temple Road, Maligawatta",
              telephone: "0112695161"
            },
            date: "2025-06-20",
            isConfirmed: null,
            confirmationDate: "2025-06-20"
          }
        ]
      },
      family: {
        id: 1,
        familyName: "Perera Family",
        address: "No 123, Temple Road, Maligawatta",
        telephone: "0112695161"
      },
      date: "2025-06-20",
      isConfirmed: null,
      confirmationDate: "2025-06-20"
    },
    {
      id: 2,
      templeDana: {
        templeId: {
          id: 2,
          name: "Gangaramaya",
          address: "Dematagoda Temple Road",
          contactNumber: "0112435127",
          email: "gangaramaya@temple.lk",
          website: "www.gangaramaya.lk"
        },
        dana: {
          id: 2,
          name: "Buddha Pooja",
          description: "Midday alms offering",
          time: "AFTERNOON"
        },
        minNumberOfFamilies: 4,
        assignments: [
          {
            id: 2,
            family: {
              id: 2,
              familyName: "Silva Family",
              address: "No 456, Lake Road, Dematagoda",
              telephone: "0112435127"
            },
            date: "2025-06-21",
            isConfirmed: null,
            confirmationDate: "2025-06-21"
          }
        ]
      },
      family: {
        id: 2,
        familyName: "Silva Family",
        address: "No 456, Lake Road, Dematagoda",
        telephone: "0112435127"
      },
      date: "2025-06-21",
      isConfirmed: null,
      confirmationDate: "2025-06-21"
    },
    {
      id: 3,
      templeDana: {
        templeId: {
          id: 3,
          name: "Dipaduttaramaya",
          address: "Maradana Temple Road",
          contactNumber: "0112691378",
          email: "dipaduttaramaya@temple.lk",
          website: "www.dipaduttaramaya.lk"
        },
        dana: {
          id: 1,
          name: "Morning Heel Dana",
          description: "Early morning rice offering",
          time: "MORNING"
        },
        minNumberOfFamilies: 3,
        assignments: [
          {
            id: 3,
            family: {
              id: 3,
              familyName: "Fernando Family",
              address: "No 789, Station Road, Maradana",
              telephone: "0112691378"
            },
            date: "2025-06-22",
            isConfirmed: null,
            confirmationDate: "2025-06-22"
          }
        ]
      },
      family: {
        id: 3,
        familyName: "Fernando Family",
        address: "No 789, Station Road, Maradana",
        telephone: "0112691378"
      },
      date: "2025-06-22",
      isConfirmed: null,
      confirmationDate: "2025-06-22"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const userRole = localStorage.getItem("userRole");

  const filteredAssignments = assignments.filter(assignment =>
    assignment.family.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.templeDana.templeId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.templeDana.dana.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getTimeColor = (time: string) => {
    switch (time) {
      case "MORNING": return "bg-yellow-100 text-yellow-800";
      case "AFTERNOON": return "bg-orange-100 text-orange-800";
      case "EVENING": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Temple</TableHead>
                <TableHead>Dana</TableHead>
                <TableHead>Family</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-orange-600" />
                      <div>
                        <div className="font-medium">{assignment.templeDana.templeId.name}</div>
                        <div className="text-xs text-gray-500">{assignment.templeDana.templeId.address}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="font-medium">{assignment.templeDana.dana.name}</div>
                        <Badge className={`${getTimeColor(assignment.templeDana.dana.time)} text-xs mt-1`}>
                          {assignment.templeDana.dana.time}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <div>
                        <div className="font-medium">{assignment.family.familyName}</div>
                        <div className="text-xs text-gray-500">{assignment.family.telephone}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(assignment.date).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={assignment.isConfirmed ? "default" : "secondary"}
                      className={`${assignment.isConfirmed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
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
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {!assignment.isConfirmed && (
                        <Button 
                          size="sm" 
                          onClick={() => handleConfirmAssignment(assignment.id)}
                          className="bg-green-600 hover:bg-green-700 text-xs"
                        >
                          Confirm
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-xs">
                        Edit
                      </Button>
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 text-xs">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Assignment</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this assignment for {assignment.family.familyName}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteAssignment(assignment.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
