import db from './db'

// returns a list of todos including associated tags
export const getTodos = async () => {
  const todos = await db.todo.findMany({
    include: {
      tags: true,
    },
  })

  return todos
}

// returns a list of tags in our database including associated todos
export const getTags = async () => {
  const tags = await db.tag.findMany({
    include: {
      todos: true,
    },
  })

  return tags
}

export const getTodoById = async (id: string) => {
  const todo = await db.todo.findFirst({
    where: {
      id: id,
    },
  })

  return todo
}
