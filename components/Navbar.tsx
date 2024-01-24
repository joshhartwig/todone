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
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      </div>
    </nav>
  )
}

export default Navbar
