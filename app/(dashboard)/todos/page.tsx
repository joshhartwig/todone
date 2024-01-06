import NewTodoForm from "@/components/NewTodoForm"
import TodoList from "@/components/TodoList"
import { getTodos } from "@/utils/dataAccess"


export default async function TodoPage() {

    // simulate delay to induce loading page
    // await new Promise((res,rej) => setTimeout(() => res(0),2000))
    // simulate error page
    // await new Promise((res,rej) => setTimeout(() => rej(0),2000))

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