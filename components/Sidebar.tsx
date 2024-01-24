'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

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
              <Checkbox
                checked={selectedTags.includes(tag.name)}
                onCheckedChange={(checked) => {
                  handleCheckboxChange(tag.name, checked ? true : false)
                }}
              />
              <span className="text-gray-900 text-sm">{tag.name}</span>
            </label>
          </li>
        ))}
        <li>
          <Button onClick={handleShowAllTodosClick} className="">
            Show All todos
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
