
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Temple {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
}

interface Village {
  id: number;
  name: string;
  province: string;
  district: string;
}

interface AssignVillageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  temple: Temple | null;
}

export const AssignVillageDialog = ({ open, onOpenChange, temple }: AssignVillageDialogProps) => {
  const [selectedVillages, setSelectedVillages] = useState<string[]>([]);
  
  const villages: Village[] = [
    { id: 1, name: "Colombo Village", province: "Western", district: "Colombo" },
    { id: 2, name: "Kandy Village", province: "Central", district: "Kandy" },
    { id: 3, name: "Galle Village", province: "Southern", district: "Galle" },
  ];

  const handleAssign = () => {
    console.log("Assigning villages:", selectedVillages, "to temple:", temple?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Villages to Temple</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selected Temple</CardTitle>
            </CardHeader>
            <CardContent>
              {temple && (
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Temple Name</p>
                    <p className="font-medium">{temple.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm">{temple.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="text-sm">{temple.contactNumber}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Villages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {villages.map((village) => (
                  <div key={village.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`village-${village.id}`}
                      className="h-4 w-4 text-orange-600 rounded border-gray-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVillages([...selectedVillages, village.id.toString()]);
                        } else {
                          setSelectedVillages(selectedVillages.filter(id => id !== village.id.toString()));
                        }
                      }}
                    />
                    <label htmlFor={`village-${village.id}`} className="text-sm">
                      <div className="font-medium">{village.name}</div>
                      <div className="text-gray-500">{village.district}, {village.province}</div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} className="bg-orange-600 hover:bg-orange-700">
            Assign Villages
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
