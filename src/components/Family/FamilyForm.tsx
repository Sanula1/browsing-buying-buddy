
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { apiService } from '../../services/api';
import { Family } from '../../types/api';
import { useToast } from '../../hooks/use-toast';

interface FamilyFormProps {
  family?: Family | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FamilyFormData {
  familyName: string;
  address: string;
  telephone: string;
}

const FamilyForm: React.FC<FamilyFormProps> = ({ family, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FamilyFormData>({
    defaultValues: {
      familyName: family?.familyName || '',
      address: family?.address || '',
      telephone: family?.telephone || '',
    },
  });

  const createMutation = useMutation({
    mutationFn: apiService.createFamily,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Family created successfully',
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create family',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FamilyFormData }) => 
      apiService.updateFamily(id, data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Family updated successfully',
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update family',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FamilyFormData) => {
    if (family) {
      updateMutation.mutate({ id: family.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="familyName">Family Name</Label>
        <Input
          id="familyName"
          {...register('familyName', { required: 'Family name is required' })}
          placeholder="Enter family name"
        />
        {errors.familyName && (
          <p className="text-sm text-red-600">{errors.familyName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          {...register('address', { required: 'Address is required' })}
          placeholder="Enter family address"
          rows={3}
        />
        {errors.address && (
          <p className="text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telephone">Telephone</Label>
        <Input
          id="telephone"
          {...register('telephone', { required: 'Telephone is required' })}
          placeholder="Enter telephone number"
        />
        {errors.telephone && (
          <p className="text-sm text-red-600">{errors.telephone.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : family ? 'Update Family' : 'Create Family'}
        </Button>
      </div>
    </form>
  );
};

export default FamilyForm;
