
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  propertyId: z.string().uuid(),
  systemType: z.string(),
  brand: z.string(),
  model: z.string(),
  serialNumber: z.string(),
  installDate: z.string().optional(),
  location: z.string(),
  photoUrl: z.string().optional(),
  maintenanceHistory: z.string().optional(),
  warrantyStatus: z.string().optional()
})

export default function EquipmentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = data => {
    fetch('/api/v1/equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(console.log)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('propertyId')} placeholder="Property ID" />
      <input {...register('systemType')} placeholder="System Type" />
      <input {...register('brand')} placeholder="Brand" />
      <input {...register('model')} placeholder="Model" />
      <input {...register('serialNumber')} placeholder="Serial Number" />
      <input type="date" {...register('installDate')} />
      <input {...register('location')} placeholder="Location" />
      <input {...register('photoUrl')} placeholder="Photo URL (optional)" />
      <input {...register('maintenanceHistory')} placeholder="Maintenance History (optional)" />
      <input {...register('warrantyStatus')} placeholder="Warranty Status (optional)" />
      <button type="submit">Submit</button>
    </form>
  )
}
