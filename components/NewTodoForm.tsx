'use client'
import { TodoSchema } from '@/lib/types'
import { addTodo } from '@/utils/actions'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const NewTodoForm = () => {
  const [contentValue, setContentValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dialogRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isModalOpen) {
      dialogRef.current.showModal()
      inputRef.current.focus()
    } else {
      dialogRef.current.close()
    }
  }, [isModalOpen])

  const handleTagFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTags((prevTags) => [...prevTags, tagInput])
    setTagInput('')
  }

  const clientAction = async (formData: FormData) => {
    const newTodo = {
      title: formData.get('title'),
      content: formData.get('content'),
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
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={clientAction}
      >
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
            onClick={() => setIsModalOpen(true)}
          >
            Add Tags
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
      </form>

      <dialog
        className={`modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${
          isModalOpen ? '' : 'hidden'
        }`}
        ref={dialogRef}
      >
        <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
          <form className="p-6" onSubmit={handleTagFormSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Tag
            </button>
          </form>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute top-0 right-0 m-2"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  )
}

export default NewTodoForm
