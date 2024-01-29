'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TodoList from './TodoList'
import Greeting from './Greeting'

export default function App({ tags, todos }) {
  const [selectedSidebarTags, setSelectedSidebarTags] = useState<string[]>([])

  const handleTagChanges = (tagName: string, checked: boolean) => {
    if (checked) {
      setSelectedSidebarTags([...selectedSidebarTags, tagName])
    } else {
      setSelectedSidebarTags([])
    }
  }

  return (
    <div className="flex">
      <aside className="sidebar w-1/5 bg-white rounded-md mx-4 my-4 px-4 py-4">
        <Sidebar
          tags={tags}
          selectedTags={selectedSidebarTags}
          onTagChange={handleTagChanges}
        />
      </aside>

      <main className="flex flex-col ml-5 w-4/5">
        <section className="greeting">
          <Greeting />
        </section>

        <section className="todos">
          <TodoList selectedTags={selectedSidebarTags} todos={todos} />
        </section>
      </main>
    </div>
  )
}
