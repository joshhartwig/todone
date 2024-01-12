import React from 'react'

const Greeting = () => {
  const date = new Date();
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  return (
    <div className='mt-4 px-4 py-4'>
      <h1 className='text-2xl'>Good Morning, Josh!</h1>
      <h3 className='text-slate-600 text-sm'>Today {formattedDate}</h3>
    </div>
  )
}

export default Greeting