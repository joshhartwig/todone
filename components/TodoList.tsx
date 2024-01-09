import Todo from "./Todo"

const TodoList = ({todos}) => {
  return (
    <div className="flex flex-col px-10 py-10 bg-white rounded-lg">
        {
            todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
            ))
        }
    </div>
  )
}

export default TodoList