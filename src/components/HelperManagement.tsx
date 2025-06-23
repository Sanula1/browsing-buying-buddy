
import { useState } from "react";
import { Plus, Search, Edit, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface Helper {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

export const HelperManagement = () => {
  const [helpers, setHelpers] = useState<Helper[]>([
    {
      id: 1,
      name: "John Silva",
      email: "john.silva@email.com",
      phone: "+94 77 123 4567",
      address: "123 Main St, Colombo",
      joinDate: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Mary Perera",
      email: "mary.perera@email.com",
      phone: "+94 77 234 5678",
      address: "456 Temple Rd, Kandy",
      joinDate: "2024-02-20",
      status: "Active"
    },
    {
      id: 3,
      name: "David Fernando",
      email: "david.fernando@email.com",
      phone: "+94 77 345 6789",
      address: "789 Church St, Galle",
      joinDate: "2024-03-10",
      status: "Inactive"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHelpers = helpers.filter(helper =>
    helper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    helper.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    helper.phone.includes(searchTerm)
  );

  const handleDelete = (id: number) => {
    setHelpers(prev => prev.filter(helper => helper.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Helper Management</h2>
          <p className="text-gray-600 mt-1">Manage temple helpers and volunteers</p>
        </div>
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-4 py-2 h-10 sm:h-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Helper
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search helpers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHelpers.map((helper) => (
                  <TableRow key={helper.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{helper.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{helper.email}</TableCell>
                    <TableCell>{helper.phone}</TableCell>
                    <TableCell>{helper.address}</TableCell>
                    <TableCell>{new Date(helper.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(helper.status)} text-xs`}>
                        {helper.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Helper</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {helper.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(helper.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
