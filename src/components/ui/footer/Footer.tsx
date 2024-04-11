import { sairaFont } from '@/config/font'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='w-full px-4 h-[200px] flex flex-col justify-center items-center'>
        <div className='h-0.5 w-full bg-gray-300 rounded-lg mb-8'></div>
        {/* Logo */}
        <div>
            <Link href="/" className='flex items-center gap-x-2'>
                <h1 className='uppercase font-bold text-3xl text-gray-600'>Amynogym</h1>
                <p className={`${sairaFont.className} text-xl`}>| Sportwear © 2024</p>
            </Link>
        </div>
            <nav className='flex justify-center items-center gap-x-4 mt-4'>
                <Link className={`${sairaFont.className} text-md`} href='/'>Inicio</Link>
                <Link className={`${sairaFont.className} text-md`} href='/products'>Productos</Link>
                <Link className={`${sairaFont.className} text-md`} href='/category/oversizes'>Oversizes</Link>
                <Link className={`${sairaFont.className} text-md`} href='/contact'>Contacto</Link>
                <Link className={`${sairaFont.className} text-md`} href='/mas-info'>Mas información</Link>
            </nav>
    </div>
  )
}
