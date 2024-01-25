import { motion } from 'framer-motion'
import { useState } from 'react'
import Todo from './Todo'
import NewTodoDialog from './NewTodoDialog'
import { Button } from './ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// These control our animation fades
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

// our types
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
  const todosPerPage = 5
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)

  // Sets our dialog to open
  const handleOpenDialogClick = () => {
    setIsDialogOpen(true)
  }

  // Sets our dialog to close
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  // Filters our todos based on selected tags
  const filteredTodos = todos.filter((todo) =>
    selectedTags.length > 0
      ? todo.tags.some((tag) => selectedTags.includes(tag.name))
      : true
  )

  // Calculate the total page count
  const pageCount = Math.ceil(filteredTodos.length / todosPerPage)

  // Get all todos for the current page
  const todosOnCurrentPage = filteredTodos.slice(
    (currentPageNumber - 1) * todosPerPage,
    currentPageNumber * todosPerPage
  )

  // Handle page change
  const handlePageChange = (newPageNumber: number) => {
    setCurrentPageNumber(newPageNumber)
  }

  return (
    <>
      <div className="flex flex-col px-1 py-1 max-h-[800px] w-[1200px] overflow-auto">
        {todosOnCurrentPage.map((todo) => (
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

      <div className="flex justify-start">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPageNumber - 1)}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(
              (pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === currentPageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              {currentPageNumber === pageCount ? (
                ''
              ) : (
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPageNumber + 1)}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
