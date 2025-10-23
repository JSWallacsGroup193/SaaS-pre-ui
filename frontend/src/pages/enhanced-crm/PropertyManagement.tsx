import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Building2, Home, Factory, Plus } from 'lucide-react';

const propertySchema = z.object({
  accountId: z.string().min(1, 'Customer is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  squareFootage: z.number().min(0).optional(),
  hvacUnits: z.number().min(0),
  accessNotes: z.string().optional(),
  gateCode: z.string().optional(),
  parkingInstructions: z.string().optional(),
  buildingAge: z.number().min(0).optional(),
  ductworkType: z.string().optional(),
  insulation: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function PropertyManagement() {
  const [properties, setProperties] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      hvacUnits: 0,
    },
  });

  const loadProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/v1/properties', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data);
    } catch (error) {
      console.error('Failed to load properties:', error);
    }
  };

  const loadAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/v1/accounts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data);
    } catch (error) {
      console.error('Failed to load accounts:', error);
    }
  };

  useEffect(() => {
    loadProperties();
    loadAccounts();
  }, []);

  const onSubmit = async (data: PropertyFormData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('/api/v1/properties', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Property created successfully');
      reset();
      setIsDialogOpen(false);
      loadProperties();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  const getPropertyIcon = (type: string) => {
    if (type === 'residential') return <Home className="h-5 w-5" />;
    if (type === 'commercial') return <Building2 className="h-5 w-5" />;
    if (type === 'industrial') return <Factory className="h-5 w-5" />;
    return <Building2 className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Property Management</h1>
            <p className="text-slate-400 mt-1">Manage customer properties and HVAC installations</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Property</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Enter property details and HVAC information
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                {/* Customer Selection */}
                <div>
                  <Label htmlFor="accountId" className="text-slate-300">Customer</Label>
                  <Select onValueChange={(value) => setValue('accountId', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id} className="text-white">
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.accountId && <p className="text-red-400 text-sm mt-1">{errors.accountId.message}</p>}
                </div>

                {/* Property Type */}
                <div>
                  <Label htmlFor="propertyType" className="text-slate-300">Property Type</Label>
                  <Select onValueChange={(value) => setValue('propertyType', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="residential" className="text-white">Residential</SelectItem>
                      <SelectItem value="commercial" className="text-white">Commercial</SelectItem>
                      <SelectItem value="industrial" className="text-white">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyType && <p className="text-red-400 text-sm mt-1">{errors.propertyType.message}</p>}
                </div>

                {/* Square Footage & HVAC Units */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="squareFootage" className="text-slate-300">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      type="number"
                      {...register('squareFootage', { valueAsNumber: true })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="e.g., 2000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hvacUnits" className="text-slate-300">HVAC Units</Label>
                    <Input
                      id="hvacUnits"
                      type="number"
                      {...register('hvacUnits', { valueAsNumber: true })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="e.g., 2"
                    />
                    {errors.hvacUnits && <p className="text-red-400 text-sm mt-1">{errors.hvacUnits.message}</p>}
                  </div>
                </div>

                {/* Building Age & Ductwork */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buildingAge" className="text-slate-300">Building Age (years)</Label>
                    <Input
                      id="buildingAge"
                      type="number"
                      {...register('buildingAge', { valueAsNumber: true })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="e.g., 15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ductworkType" className="text-slate-300">Ductwork Type</Label>
                    <Select onValueChange={(value) => setValue('ductworkType', value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="metal" className="text-white">Metal</SelectItem>
                        <SelectItem value="flex" className="text-white">Flex</SelectItem>
                        <SelectItem value="fiberglass" className="text-white">Fiberglass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Insulation */}
                <div>
                  <Label htmlFor="insulation" className="text-slate-300">Insulation Level</Label>
                  <Select onValueChange={(value) => setValue('insulation', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Select insulation level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="none" className="text-white">None</SelectItem>
                      <SelectItem value="standard" className="text-white">Standard</SelectItem>
                      <SelectItem value="high_efficiency" className="text-white">High Efficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Access Notes */}
                <div>
                  <Label htmlFor="accessNotes" className="text-slate-300">Access Notes</Label>
                  <Textarea
                    id="accessNotes"
                    {...register('accessNotes')}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="Special access instructions..."
                    rows={3}
                  />
                </div>

                {/* Gate Code & Parking */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gateCode" className="text-slate-300">Gate Code</Label>
                    <Input
                      id="gateCode"
                      {...register('gateCode')}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="e.g., #1234"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parkingInstructions" className="text-slate-300">Parking Instructions</Label>
                    <Input
                      id="parkingInstructions"
                      {...register('parkingInstructions')}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="e.g., Visitor spots available"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    {loading ? 'Creating...' : 'Create Property'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-teal-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400">
                    {getPropertyIcon(property.propertyType)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white capitalize">{property.propertyType}</h3>
                    <p className="text-sm text-slate-400">{property.account?.name}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {property.squareFootage && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Square Footage:</span>
                    <span className="text-white">{property.squareFootage.toLocaleString()} sq ft</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">HVAC Units:</span>
                  <span className="text-white">{property.hvacUnits}</span>
                </div>
                {property.buildingAge && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Building Age:</span>
                    <span className="text-white">{property.buildingAge} years</span>
                  </div>
                )}
                {property.ductworkType && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ductwork:</span>
                    <span className="text-white capitalize">{property.ductworkType}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No properties found. Add your first property to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
