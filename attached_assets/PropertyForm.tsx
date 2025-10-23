
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  customerId: z.string().uuid(),
  address: z.string().min(1),
  propertyType: z.string(),
  squareFootage: z.number().int().min(1),
  hvacUnits: z.number().int().min(0),
  accessNotes: z.string().optional()
})

export default function PropertyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = data => {
    fetch('/api/v1/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(console.log)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('customerId')} placeholder="Customer ID" />
      <input {...register('address')} placeholder="Address" />
      <input {...register('propertyType')} placeholder="Property Type" />
      <input type="number" {...register('squareFootage')} placeholder="Square Footage" />
      <input type="number" {...register('hvacUnits')} placeholder="Number of HVAC Units" />
      <input {...register('accessNotes')} placeholder="Access Notes (optional)" />
      <button type="submit">Submit</button>
    </form>
  )
}
