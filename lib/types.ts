import { z } from 'zod'

export const TodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title must contain more then 1 character',
    })
    .max(50, {
      message: 'Title cannot contain more then 50 characters',
    }),
  content: z
    .string()
    .trim()
    .min(1, {
      message: 'Todo must contain more then 1 character',
    })
    .max(100, {
      message: 'Todo cannot contain more then 100 characters',
    }),
  tags: z.array(z.string()),
})
