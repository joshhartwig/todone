import { motion } from 'framer-motion'
import Todo from './Todo'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

const TodoList = ({ todos, selectedTag }) => {
  const filteredTodos = todos.filter((todo) =>
    selectedTag ? todo.tags.some((tag) => tag.name === selectedTag) : true
  )
  return (
    <div className="flex flex-col px-10 py-10 bg-white rounded-lg min-h-[500px] max-h-[500px] w-[500px] overflow-auto">
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
  )
}

export default TodoList
