import NewTodoForm from '@/components/NewTodoForm'
import Image from 'next/image'

// test function to simulate api call, only used in one chapter
const getData = async () => {
  await new Promise((res) => setTimeout(() => res(0),2000))
  return { data: [1,2,3]}
}

export default async function Home() {

  const data = await getData()
  return (
    <main>
      

    </main>
  )
}
