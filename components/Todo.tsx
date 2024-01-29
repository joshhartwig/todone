'use client'
import { completeTodo } from '@/utils/actions'
import Link from 'next/link'
import { useTransition, ReactElement } from 'react'
import { Badge } from './ui/badge'
import {
  IconEdit,
  IconSquare,
  IconSquareCheckFilled,
  IconTrash,
} from '@tabler/icons-react'

interface Tag {
  id: string
  name: string
}

interface TodoProps {
  todo: {
    id: string
    title: string
    content: string
    completed: boolean
    tags: Tag[]
  }
  onEditClick: (todoId: string) => void
  onCompleteClick: (todoId: string) => void
  onDeleteClick: (todoId: string) => void
}

const Todo = ({
  todo,
  onEditClick,
  onCompleteClick,
  onDeleteClick,
}: TodoProps): ReactElement => {
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
          {todo.completed ? (
            <button className="mr-2" onClick={() => onCompleteClick(todo.id)}>
              <span>
                <IconSquareCheckFilled size={18} />
              </span>
            </button>
          ) : (
            <button className="mr-2" onClick={() => onCompleteClick(todo.id)}>
              <span>
                <IconSquare size={18} />
              </span>
            </button>
          )}

          {/* Edit */}
          <button className="mr-2" onClick={() => onEditClick(todo.id)}>
            <span>
              <IconEdit size={18} />
            </span>
          </button>

          {/* Delete */}
          <button className="mr-2" onClick={() => onDeleteClick(todo.id)}>
            <span>
              <IconTrash size={18} />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Todo
