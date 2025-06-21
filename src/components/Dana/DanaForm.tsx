
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { apiService } from '../../services/api';
import { Dana } from '../../types/api';
import { useToast } from '../../hooks/use-toast';

interface DanaFormProps {
  dana?: Dana | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface DanaFormData {
  name: string;
  description: string;
  time: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
}

const DanaForm: React.FC<DanaFormProps> = ({ dana, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DanaFormData>({
    defaultValues: {
      name: dana?.name || '',
      description: dana?.description || '',
      time: dana?.time || 'MORNING',
    },
  });

  const watchedTime = watch('time');

  const createMutation = useMutation({
    mutationFn: apiService.createDana,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Dana created successfully',
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create dana',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: DanaFormData }) => 
      apiService.updateDana(id, data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Dana updated successfully',
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update dana',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: DanaFormData) => {
    if (dana) {
      updateMutation.mutate({ id: dana.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Dana Name</Label>
        <Input
          id="name"
          {...register('name', { required: 'Dana name is required' })}
          placeholder="Enter dana name"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter dana description"
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Select
          value={watchedTime}
          onValueChange={(value: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT') => 
            setValue('time', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MORNING">Morning</SelectItem>
            <SelectItem value="AFTERNOON">Afternoon</SelectItem>
            <SelectItem value="EVENING">Evening</SelectItem>
            <SelectItem value="NIGHT">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : dana ? 'Update Dana' : 'Create Dana'}
        </Button>
      </div>
    </form>
  );
};

export default DanaForm;
