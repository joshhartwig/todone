'use client'
import React, { useState, useEffect } from 'react'

interface Tag {
  id: number
  name: string
}

interface SideBarProps {
  tags: Tag[]
  onTagSelect: (tagName: string | null) => void
}

const Sidebar = ({ tags, onTagSelect }: SideBarProps) => {
  useEffect(() => {}, [tags])

  console.log(tags)
  return (
    <div className="px-4 py-2">
      <ul>
        <li onClick={() => onTagSelect(null)}>Show all todos</li>
        {tags.map((tag, idx) => (
          <li key={idx} onClick={() => onTagSelect(tag.name)}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
