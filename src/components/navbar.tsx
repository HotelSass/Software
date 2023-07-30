'use client'
import React from 'react'
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathUrl=usePathname()
  return (
    <div className='w-full p-5 bg-gray-200'>
    </div>
  )
}

export default Navbar