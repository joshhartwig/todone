'use server'
import { revalidatePath } from 'next/cache'
import { TodoSchema } from '@/lib/types'
import db from './db'
import { create } from 'domain'

/*
    these are server actions, they allows us to hook into the forms
    and run code to capture data from the forms
*/

// creates a new todo in the database
export const addTodo = async (newTodo) => {
  const { tags, ...rest } = newTodo
  const result = TodoSchema.safeParse(newTodo)
  if (!result.success) {
    //output error message
    let error = ''
    result.error.issues.forEach((issue) => {
      error = error + issue.path[0] + ':' + issue.message + '. '
    })

    return {
      error: error,
    }
  }

  const createdTodo = await db.todo.create({
    data: {
      title: result.data.title,
      content: result.data.content,
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          }
        }),
      },
    },
  })

  // this will expire the cache of the todos page and force it to refetch data
  revalidatePath('/todos')
  return createdTodo
}

export const completeTodo = async (id: string) => {
  const todo = await db.todo.update({
    where: { id },
    data: {
      completed: true,
    },
  })

  // this will expire the cache of the todos page and force it to refetch data
  revalidatePath('/todos')
}
