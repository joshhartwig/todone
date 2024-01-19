import NewTodoForm from '@/components/NewTodoForm'
import TodoList from '@/components/TodoList'
import { getTodos } from '@/utils/dataAccess'

export default async function TodoPage() {
  const todos = await getTodos()
  return (
    <>
      <div>
        <h1>Todos:</h1>
        <TodoList todos={todos} />
      </div>
      <div>
        <NewTodoForm />
      </div>
    </>
  )
}
