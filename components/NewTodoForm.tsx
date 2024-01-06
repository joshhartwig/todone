'use client'
import { TodoSchema } from "@/lib/types"
import { addTodo } from "@/utils/actions"
import { useState } from "react"

import toast from "react-hot-toast"

const NewTodoForm = () => {
  const [inputValue, setInputValue] = useState('')

  const clientAction = async (formData: FormData) => {
    const newTodo = {
      content: formData.get('content')
    }
    // parse the new todo and validate against the zod schema
    const result = TodoSchema.safeParse(newTodo)
    if(!result.success) {
      //output error message
      let error = ""
      result.error.issues.forEach((issue) => {
        error = error + issue.path[0] + ':' + issue.message + '. '
      })
      toast.error(error)
      return
    }
    
    const res = await addTodo(result.data)

    // if we get an error response notify via toast
    if(res?.error) {
      toast.error(res.error)
    }

    // clearn our input
    setInputValue('')
  }

  return (
    <form action={clientAction}>
      <input 
        type="text" 
        name="content" 
        className="border border-black/25 rounded mx-2" 
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}/>
      <button type="submit" className="border border-black/25 rounded mx-2 p-1">New Todo</button>
    </form>
  )
}

export default NewTodoForm