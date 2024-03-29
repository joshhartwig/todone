import { NextResponse } from 'next/server'
import db from '@/utils/db'

// returns all todos as json
export const GET = async (request: Request) => {
  const todos = await db.todo.findMany({})
  return NextResponse.json({
    data: todos,
  })
}

// export const POST = async (request: Request) => {
//   const data = await request.json()
//   const todo = await db.todo.create({
//     data: data,
//   })
//   return NextResponse.json({
//     message: todo,
//   })
// }
