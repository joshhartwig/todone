'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TodoList from './TodoList'
import { getTags, getTodos } from '@/utils/dataAccess'
import Greeting from './Greeting'

export default function App({ tags, todos }) {
  const [selectedTag, setSelectedTag] = useState(null)

  return (
    <>
      <aside className="sidebar flex w-1/6 bg-white rounded-md my-4 mx-4">
        <Sidebar onTagSelect={setSelectedTag} tags={tags} />
      </aside>

      <main className="flex flex-col ml-10">
        <section className="greeting">
          <Greeting />
        </section>

        <section className="todos">
          <TodoList selectedTag={selectedTag} todos={todos} />
        </section>
      </main>
    </>
  )
}
