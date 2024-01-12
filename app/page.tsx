import { getTodos } from '@/utils/dataAccess'
import TodoList from "@/components/TodoList"
import Sidebar from '@/components/Sidebar'
import Greeting from '@/components/Greeting'
import Image from 'next/image'

export default async function Home() {

  const todos = await getTodos()
  return (
    <>
      <aside className='sidebar flex w-1/6 bg-white rounded-md my-4 mx-4'>
        <Sidebar />
      </aside>

      <main className='flex flex-col ml-10'>
        <section className='greeting'>
          <Greeting />
        </section>

        <section className='todos'>
          <TodoList todos={todos} />
        </section>
    </main>
    </>
    
  )
}
