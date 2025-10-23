
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  preferredContactMethod: z.string()
})

export default function CustomerForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = data => {
    fetch('/api/v1/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(console.log)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('fullName')} placeholder="Full Name" />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('phone')} placeholder="Phone" />
      {errors.phone && <p>{errors.phone.message}</p>}

      <input {...register('preferredContactMethod')} placeholder="Preferred Contact Method" />
      {errors.preferredContactMethod && <p>{errors.preferredContactMethod.message}</p>}

      <button type="submit">Submit</button>
    </form>
  )
}
