'use client'
import { TodoSchema } from '@/lib/types'
import { addTodo } from '@/utils/actions'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { Form } from './ui/form'
import { DialogHeader } from './ui/dialog'

const NewTodoFormOld = ({ onClose }) => {
  const [contentValue, setContentValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const mainDialogRef = useRef(null)
  const tagDialogRef = useRef(null)
  const inputRef = useRef(null)

  const handleTagFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTags((prevTags) => [...prevTags, tagInput])
    setTagInput('')
    onClose()
  }

  const handleDialogClose = () => {
    if (mainDialogRef.current) {
      mainDialogRef.current.close()
    }
    onClose()
  }

  const clientAction = async (formData: FormData) => {
    const newTodo = {
      title: formData.get('title'),
      content: formData.get('content'),
      tags,
    }
    // parse the new todo and validate against the zod schema
    const result = TodoSchema.safeParse(newTodo)

    // if we have an error
    if (!result.success) {
      //output error message
      let error = ''
      result.error.issues.forEach((issue) => {
        error = error + issue.path[0] + ':' + issue.message + '. '
      })
      toast.error(error)
      return
    }

    const res = await addTodo(result.data)

    // if we get an error response notify via toast
    if (res?.error) {
      toast.error(res.error)
    }

    // clearn our input
    setContentValue('')
    setTitleValue('')
  }

  return (
    <Dialog open={true} modal={true}>
      <DialogTitle>Open</DialogTitle>
      <DialogContent>
        <Form action={clientAction}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={titleValue}
              id="title"
              type="text"
              placeholder="Title"
              name="title"
              //value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              name="content"
              placeholder="content"
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Todo
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => onClose()}
            >
              Close
            </button>
          </div>

          <div className="my-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tags
            </label>
            <div className="flex flex-wrap">
              {tags.map((t) => (
                <span
                  key={t}
                  className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewTodoFormOld
