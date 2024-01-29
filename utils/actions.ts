'use server'
import { revalidatePath } from 'next/cache'
import { TodoSchema } from '@/lib/types'
import db from './db'

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

// Edits a todos, typicalled called from the form after validation
export const editTodo = async (id: string, todo) => {
  const { tags, ...rest } = todo

  // verify the schema
  const result = TodoSchema.safeParse(todo)
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

  const currentTodo = await db.todo.findUnique({
    where: { id },
    include: { tags: true },
  })

  // get all tag names
  const currentTagNames = currentTodo?.tags?.map((tag) => tag.name) || []

  // disconnect all the current tags
  const disconnectTags = currentTagNames.map((name) => ({ name }))

  // create an object pair for each tag that needs created
  const connectOrCreateTags = tags.map((name) => ({
    where: { name },
    create: { name },
  }))

  const updatedTodo = await db.todo.update({
    where: { id },
    data: {
      ...rest,
      tags: {
        disconnect: disconnectTags,
        connectOrCreate: connectOrCreateTags,
      },
    },
  })
  // this will expire the cache of the todos page and force it to refetch data
  cleanOrphanedTags()
  revalidatePath('/')
  return updatedTodo
}

// Mark a todo complete
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

// Delete a todo based on string id
export const deleteTodo = async (id: string) => {
  const todo = await db.todo.delete({
    where: { id },
  })
  cleanOrphanedTags()
  revalidatePath('/')
}

// this cleans up any orphaned tags after an edit if someone deletes a tag
const cleanOrphanedTags = async () => {
  const orphans = await db.tag.findMany({
    where: {
      todos: {
        none: {},
      },
    },
  })

  for (const tag of orphans) {
    await db.tag.delete({
      where: { id: tag.id },
    })
  }
}
