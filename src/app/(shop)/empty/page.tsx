import Link from 'next/link'
import React from 'react'
import { IoCartOutline } from 'react-icons/io5'

export default function EmptyPage() {
  return (
    <div className='flex justify-center items-center h-[600px]'>
      <IoCartOutline size={80} className='mx-5'/>
      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-semibold'>
          Tu carrito se encuentra vacío
        </h1>
        <Link href='/' className='text-blue-500  text-4xl'>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
