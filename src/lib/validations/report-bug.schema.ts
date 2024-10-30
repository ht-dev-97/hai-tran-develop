import { z } from 'zod'

export const reportBugSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Full name is required' })
    .max(255, { message: 'Full name cannot exceed 255 characters' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' })
    .max(255, { message: 'Email cannot exceed 255 characters' }),
  message: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(1000, { message: 'Description cannot exceed 1000 characters' })
})
