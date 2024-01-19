'use client'
import React, { useState, useEffect } from 'react'

interface Tag {
  id: number
  name: string
}

interface SideBarProps {
  tags: Tag[]
  selectedTags: string[]
  onTagChange: (tagName: string, checked: boolean) => void
}

const Sidebar = ({ tags, selectedTags, onTagChange }: SideBarProps) => {
  const [checkedTags, setCheckedTags] = useState<string[]>([])

  const handleCheckboxChange = (tagName: string, checked: boolean) => {
    if (checked) {
      setCheckedTags([...checkedTags, tagName])
    } else {
      setCheckedTags(checkedTags.filter((tag) => tag !== tagName))
    }
    onTagChange(tagName, checked)
  }

  const handleShowAllTodosClick = () => {
    setCheckedTags([])
    tags.forEach((tag) => {
      onTagChange(tag.name, false)
    })
  }

  return (
    <div className="px-4 py-2">
      <ul>
        {tags.map((tag, idx) => (
          <li key={idx}>
            <label className="flex items-center space-x-3 mb-2">
              <input
                type="checkbox"
                value={tag.name}
                checked={selectedTags.includes(tag.name)}
                onChange={(e) =>
                  handleCheckboxChange(tag.name, e.target.checked)
                }
                className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
              />
              <span className="text-gray-900 text-sm">{tag.name}</span>
            </label>
          </li>
        ))}
        <li>
          <button
            onClick={handleShowAllTodosClick}
            className="mt-4 py-2 px-4 bg-gray-700 text-white rounded-md text-sm"
          >
            Show All todos
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
