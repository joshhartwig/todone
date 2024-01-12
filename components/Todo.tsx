'use client'
import { completeTodo } from "@/utils/actions"
import { useTransition } from "react"


const Todo = ({todo}) => {
  const [isPending, startTransition] = useTransition()
  console.log(todo)
  return (
    <>
      <div className="flex flex-col h-1/4 w-3/4 my-2 px-4 py-2 border border-black/20 cursor-pointer rounded-lg">
        <h2 className="font-bold text-large mb-0">{todo.title}</h2>
        <p className="text-gray-600 text-sm">{todo.content}</p>
      </div>
    </>
    // <div 
    //   className={`border border-black/20 cursor-pointer ${todo.completed ? 'line-through' : ''}`} 
    //   onClick={()=> startTransition(() => {
    //   completeTodo(todo.id)
    // })}>{todo.content}</div>
  )
}

export default Todo