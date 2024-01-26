'use server'
import { revalidatePath } from 'next/cache'
import { TodoSchema } from '@/lib/types'
import db from './db'
import { create } from 'domain'

/*
    these are server actions, they allows us to hook into the forms
    and run code to capture data from the forms
*/

// Creates new todo in database
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

// Edits Todos via the edit form
export const editTodo = async (id: string, updatedTodo) => {
  const { tags, ...rest } = updatedTodo
  const result = TodoSchema.safeParse(updatedTodo)
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

  const tagRecords = tags.map((tag) => ({ name: tag }))

  // Fetch our todo in the database and update it
  const updatedTodoInDb = await db.todo.update({
    where: { id },
    data: {
      ...rest,
      tags: {
        connectOrCreate: tagRecords.map((tag) => ({
          where: { name: tag.name },
          create: tag,
        })),
      },
    },
  })
  // this will expire the cache of the todos page and force it to refetch data
  revalidatePath('/todos')
  return updatedTodoInDb
}

// Marks a todo complete
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
