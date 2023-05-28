import React from 'react'
import Image from 'next/image'
const Logo = () => {
  return (
    <Image src="/images/logo.png" width={100} height={100} className='rounded-sm' alt='Software Logo' />
  )
}

export default Logo