import React from 'react'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b border-green-500'>
     <h2 onClick={()=> router.push('/')} className='my-font font-semibold tracking-wider'>SHOP<span className='text-green-700'>NEST</span></h2>
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar