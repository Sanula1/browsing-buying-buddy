
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { apiService } from '../services/api';
import { Dana } from '../types/api';
import DanaForm from '../components/Dana/DanaForm';
import { useToast } from '../hooks/use-toast';

const DanaPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDana, setSelectedDana] = useState<Dana | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: danas = [], isLoading, error } = useQuery({
    queryKey: ['danas'],
    queryFn: apiService.getAllDanas,
  });

  const deleteMutation = useMutation({
    mutationFn: apiService.deleteDana,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['danas'] });
      toast({
        title: 'Success',
        description: 'Dana deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete dana',
        variant: 'destructive',
      });
    },
  });

  const filteredDanas = danas.filter((dana: Dana) => 
    dana.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dana.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (dana: Dana) => {
    setSelectedDana(dana);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedDana(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this dana?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedDana(null);
    queryClient.invalidateQueries({ queryKey: ['danas'] });
  };

  const getTimeColor = (time: string) => {
    switch (time) {
      case 'MORNING': return 'bg-yellow-100 text-yellow-800';
      case 'AFTERNOON': return 'bg-blue-100 text-blue-800';
      case 'EVENING': return 'bg-purple-100 text-purple-800';
      case 'NIGHT': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6">
        <p>Error loading danas. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dana Management</h1>
          <p className="text-gray-600 mt-1">Manage dana offerings and ceremonies</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Dana
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedDana ? 'Edit Dana' : 'Add New Dana'}
              </DialogTitle>
            </DialogHeader>
            <DanaForm
              dana={selectedDana}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Dana</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search danas..."
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
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDanas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No danas found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDanas.map((dana: Dana) => (
                  <TableRow key={dana.id}>
                    <TableCell className="font-medium">{dana.name}</TableCell>
                    <TableCell>{dana.description}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTimeColor(dana.time)}`}>
                        {dana.time}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(dana)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(dana.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DanaPage;
