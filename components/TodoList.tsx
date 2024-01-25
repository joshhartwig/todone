import { motion } from 'framer-motion'
import { useState } from 'react'
import Todo from './Todo'
import NewTodoDialog from './NewTodoDialog'
import { Button } from './ui/button'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

interface Tag {
  id: string
  name: string
  todos: Todo[]
}

interface Todo {
  id: string
  title: string
  createdAt: Date
  completed: boolean
  content: string
  tags: Tag[]
}

interface TodoListProps {
  todos: Todo[]
  selectedTags: string[]
}

const TodoList: React.FC<TodoListProps> = ({ todos, selectedTags }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialogClick = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const filteredTodos = todos.filter((todo) =>
    selectedTags.length > 0
      ? todo.tags.some((tag) => selectedTags.includes(tag.name))
      : true
  )
  return (
    <>
      <div className="flex flex-col px-1 py-1 min-h-[500px] max-h-[800px] w-[1200px] overflow-auto">
        {filteredTodos.map((todo) => (
          <motion.div
            key={todo.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
            <Todo key={todo.id} todo={todo} />
          </motion.div>
        ))}
      </div>
      <div>
        <Button onClick={handleOpenDialogClick}>Add New Todo</Button>

        {isDialogOpen && (
          <NewTodoDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            modal={true}
          />
        )}
      </div>
    </>
  )
}

export default TodoList
