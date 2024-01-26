'use client'
import { completeTodo } from '@/utils/actions'
import Link from 'next/link'
import { useTransition, ReactElement } from 'react'
import { Badge } from './ui/badge'
import { IconEdit } from '@tabler/icons-react'

interface Tag {
  id: string
  name: string
}

interface TodoProps {
  todo: {
    id: string
    title: string
    content: string
    tags: Tag[]
  }
  onEditClick: (todoId: string) => void
}

const Todo = ({ todo, onEditClick }: TodoProps): ReactElement => {
  const [isPending, startTransition] = useTransition()
  return (
    <>
      <div className="flex justify-between items-center h-1/4 w-3/4 my-2 px-4 py-2 border border-black/10 bg-white cursor-pointer rounded-lg">
        <div className="flex flex-col ">
          <h2 className="font-bold text-large mb-0">{todo.title}</h2>
          <p className="text-gray-600 text-sm">{todo.content}</p>
          <div className="flex flex-wrap mt-2">
            {todo.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <button className="" onClick={() => onEditClick(todo.id)}>
            <span>
              <IconEdit />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Todo
