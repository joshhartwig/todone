import db from './db'


export const getTodos = async () => {
    return db.todo.findMany({})
}

