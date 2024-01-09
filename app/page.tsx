import NewTodoForm from '@/components/NewTodoForm'
import { getTodos } from '@/utils/dataAccess'
import TodoList from "@/components/TodoList"
import Image from 'next/image'

// test function to simulate api call, only used in one chapter
const getData = async () => {
  await new Promise((res) => setTimeout(() => res(0),2000))
  return { data: [1,2,3]}
}

export default async function Home() {

  const todos = await getTodos()
  return (
    <main className='flex flex-row'>
      <div>
        <div className='w-1/4 bg-slate-300 h-full'>
          <p>Todo:</p>
          <ul>
            <li>Create a dedicated new todo modal form</li>
            <li>Create an intro / welcome that sits on top of todos</li>
            <li>Create a component that allows you to add multiple tags to todo</li>
            <li>fix styling</li>
          </ul>
        </div>
      </div>
      <div className='w-3/4 h-full'>
          <TodoList todos={todos} />
      </div>
      
    </main>
  )
}
