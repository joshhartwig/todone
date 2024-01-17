import { getTags, getTodos } from '@/utils/dataAccess'
import Image from 'next/image'
import App from '@/components/App'

export default async function Home() {
  const todos = await getTodos()
  const tags = await getTags()

  return (
    <>
      <App todos={todos} tags={tags} />
    </>
  )
}
