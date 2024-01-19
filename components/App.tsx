'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TodoList from './TodoList'
import { getTags, getTodos } from '@/utils/dataAccess'
import Greeting from './Greeting'

export default function App({ tags, todos }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagChanges = (tagName: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tagName])
    } else {
      setSelectedTags([])
    }
  }

  return (
    <div className="flex">
      <aside className="sidebar w-1/5 bg-white rounded-md mx-4 my-4 px-4 py-4">
        <Sidebar
          tags={tags}
          selectedTags={selectedTags}
          onTagChange={handleTagChanges}
        />
      </aside>

      <main className="flex flex-col ml-5 w-4/5">
        <section className="greeting">
          <Greeting />
        </section>

        <section className="todos">
          <TodoList selectedTags={selectedTags} todos={todos} />
        </section>
      </main>
    </div>
  )
}
