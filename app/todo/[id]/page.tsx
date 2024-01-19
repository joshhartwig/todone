import { getTodoById } from '@/utils/dataAccess'
import React from 'react'

const TodoIdPage = async ({ params }) => {
  const todo = await getTodoById(params.id)

  return (
    <div className="w-full bg-white flex">
      <div className="bg-gray-500 rounded-lg">
        <h1>{todo?.title}</h1>
      </div>
    </div>
  )
}

export default TodoIdPage
