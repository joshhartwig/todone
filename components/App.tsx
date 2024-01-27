'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TodoList from './TodoList'
import { getTags, getTodos } from '@/utils/dataAccess'
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

  //TODO: shfit the data pulling here
  //TODO: to fix the issue of old tags being stagnant after a tag deletion. After a tag edit, we need a way to unselect everything, repull the tags down fresh

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
