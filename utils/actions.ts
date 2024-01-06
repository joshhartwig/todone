'use server'
import { revalidatePath } from 'next/cache'
import { TodoSchema } from '@/lib/types'
import db from './db'


/*
    these are server actions, they allows us to hook into the forms
    and run code to capture data from the forms
*/

export const addTodo = async (newTodo: unknown) => {
    //server side validation

    const result = TodoSchema.safeParse(newTodo)
    if(!result.success) {
        //output error message
        let error = ""
        result.error.issues.forEach((issue) => {
          error = error + issue.path[0] + ':' + issue.message + '. '
        })
  
        return {
            error: error
        }
      }

    await db.todo.create({
        data: {
            content: result.data.content
        }
    })

    // this will expire the cache of the todos page and force it to refetch data
    revalidatePath('/todos')
}

export const completeTodo = async (id: string) => {
    const todo = await db.todo.update({
        where: {id},
        data: {
            completed: true,
        }
    })

    // this will expire the cache of the todos page and force it to refetch data
    revalidatePath('/todos')
}