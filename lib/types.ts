import { z } from 'zod'

export const TodoSchema = z.object({
    content: z.string().trim().min(1, {
      message:"Todo must contain more then 1 character"
    }).max(100, {
      message: "Todo cannot contain more then 100 characters"
    })
  })

 