
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  serviceRequestId: z.string().uuid(),
  estimateAmount: z.number(),
  invoiceTotal: z.number(),
  paymentStatus: z.string(),
  paymentMethod: z.string()
})

export default function FinancialForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = data => {
    fetch('/api/v1/financials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(console.log)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('serviceRequestId')} placeholder="Service Request ID" />
      <input type="number" {...register('estimateAmount')} placeholder="Estimate Amount" />
      <input type="number" {...register('invoiceTotal')} placeholder="Invoice Total" />
      <input {...register('paymentStatus')} placeholder="Payment Status" />
      <input {...register('paymentMethod')} placeholder="Payment Method" />
      <button type="submit">Submit</button>
    </form>
  )
}
