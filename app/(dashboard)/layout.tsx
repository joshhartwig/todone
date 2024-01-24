// components/LayoutMenu.js
import NewTodoForm from '@/components/NewTodoFormOld'
import Link from 'next/link'

const LayoutMenu = ({ children }) => {
  return <div className="mx-4">{children}</div>
}

export default LayoutMenu
