import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-white rounded-md mx-4 my-4 px-4 py-4 flex justify-between">
      <div className="">
        <ul className="flex">
          <li className="mr-6">
            <Link href="/" className="text-gray-500 hover:text-gray-900"></Link>
          </li>
          <li className="mr-6">
            <Link href="/" className="text-gray-900 hover:text-gray-400">
              Todos
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/about" className="text-gray-900 hover:text-gray-400">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div></div>
    </nav>
  )
}

export default Navbar
