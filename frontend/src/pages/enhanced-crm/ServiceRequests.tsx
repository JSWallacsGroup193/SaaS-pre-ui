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
import { Badge } from '@/components/ui/badge';
import { Wrench, Plus, Clock } from 'lucide-react';
import { format } from 'date-fns';

const serviceRequestSchema = z.object({
  accountId: z.string().min(1, 'Customer is required'),
  propertyId: z.string().optional(),
  equipmentId: z.string().optional(),
  requestType: z.string().min(1, 'Request type is required'),
  problemDescription: z.string().min(10, 'Please provide a detailed description'),
  preferredDateTime: z.string().optional(),
  priority: z.string().optional(),
});

type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;

export default function ServiceRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
  });

  const loadRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/v1/service-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (error) {
      console.error('Failed to load service requests:', error);
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
    loadRequests();
    loadAccounts();
  }, []);

  const onSubmit = async (data: ServiceRequestFormData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('/api/v1/service-requests', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Service request created successfully');
      reset();
      setIsDialogOpen(false);
      loadRequests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create service request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      scheduled: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      cancelled: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-slate-500/10 text-slate-400',
      normal: 'bg-blue-500/10 text-blue-400',
      high: 'bg-amber-500/10 text-amber-400',
      emergency: 'bg-red-500/10 text-red-400',
    };
    return colors[priority as keyof typeof colors] || colors.normal;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Service Requests</h1>
            <p className="text-slate-400 mt-1">Manage customer service requests and track status</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Create Service Request</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Submit a new service request for a customer
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

                {/* Request Type & Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requestType" className="text-slate-300">Request Type</Label>
                    <Select onValueChange={(value) => setValue('requestType', value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="repair" className="text-white">Repair</SelectItem>
                        <SelectItem value="maintenance" className="text-white">Maintenance</SelectItem>
                        <SelectItem value="installation" className="text-white">Installation</SelectItem>
                        <SelectItem value="inspection" className="text-white">Inspection</SelectItem>
                        <SelectItem value="consultation" className="text-white">Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.requestType && <p className="text-red-400 text-sm mt-1">{errors.requestType.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-slate-300">Priority</Label>
                    <Select onValueChange={(value) => setValue('priority', value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="low" className="text-white">Low</SelectItem>
                        <SelectItem value="normal" className="text-white">Normal</SelectItem>
                        <SelectItem value="high" className="text-white">High</SelectItem>
                        <SelectItem value="emergency" className="text-white">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <Label htmlFor="problemDescription" className="text-slate-300">Problem Description</Label>
                  <Textarea
                    id="problemDescription"
                    {...register('problemDescription')}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="Describe the issue in detail..."
                    rows={4}
                  />
                  {errors.problemDescription && <p className="text-red-400 text-sm mt-1">{errors.problemDescription.message}</p>}
                </div>

                {/* Preferred Date/Time */}
                <div>
                  <Label htmlFor="preferredDateTime" className="text-slate-300">Preferred Date & Time</Label>
                  <Input
                    id="preferredDateTime"
                    type="datetime-local"
                    {...register('preferredDateTime')}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
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
                    {loading ? 'Creating...' : 'Create Request'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Service Requests List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-teal-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getStatusColor(request.status)} variant="outline">
                      {request.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(request.priority)} variant="outline">
                      {request.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {request.requestNumber} - {request.requestType.charAt(0).toUpperCase() + request.requestType.slice(1)}
                  </h3>
                  <p className="text-slate-400 text-sm">{request.account?.name}</p>
                </div>
                <div className="text-right text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {format(new Date(request.createdAt), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-4">{request.problemDescription}</p>
              {request.preferredDateTime && (
                <div className="flex items-center gap-2 text-sm text-teal-400">
                  <Wrench className="h-4 w-4" />
                  Preferred: {format(new Date(request.preferredDateTime), 'MMM d, yyyy h:mm a')}
                </div>
              )}
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No service requests found. Create your first request to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
