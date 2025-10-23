
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  customerId: z.string().uuid(),
  equipmentId: z.string().uuid(),
  requestType: z.string(),
  problemDescription: z.string(),
  preferredDateTime: z.string(),
  technicianNotes: z.string().optional(),
  status: z.string()
})

export default function ServiceRequestForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = data => {
    fetch('/api/v1/service-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(console.log)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('customerId')} placeholder="Customer ID" />
      <input {...register('equipmentId')} placeholder="Equipment ID" />
      <input {...register('requestType')} placeholder="Request Type" />
      <textarea {...register('problemDescription')} placeholder="Problem Description" />
      <input type="datetime-local" {...register('preferredDateTime')} />
      <input {...register('technicianNotes')} placeholder="Technician Notes (optional)" />
      <input {...register('status')} placeholder="Status" />
      <button type="submit">Submit</button>
    </form>
  )
}
