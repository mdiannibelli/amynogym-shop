import Link from 'next/link'
import React, { ReactElement, ReactEventHandler } from 'react'
import {IoCartOutline, IoSearchOutline} from "react-icons/io5"
import ButtonMenu from './ButtonMenu'
import DropdownMenu from './DropdownMenu'

export default function TopMenu() {
  return (
    <nav className='flex py-2 px-8 justify-center md:justify-between items-center w-full'>
        {/* Logo */}
        <div>
            <Link href="/">
                <h1 className='uppercase font-bold text-3xl'>Amynogym</h1>
            </Link>
        </div>
        {/* Menu */}
        <div className='hidden sm:flex flex-wrap flex-1 justify-center items-center'>
            <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/">Inicio</Link>
            <DropdownMenu/>
            <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/oversizes">Oversizes</Link>
           {/*  //TODO Productos - Selector(Oversizes | Musculosas) */}
            <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="#">Contacto</Link>
            <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="#">Más información</Link>
        </div>

        {/* Search & Cart Menu */}
        <div className='flex items-center'>
            <Link href="/search" className='mx-2'>
                <IoSearchOutline className='w-5 h-5'/>
            </Link>
            <Link href="/cart" className='mx-2'>
                <div className='relative'>
                    <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-slate-900 text-white'>3</span>
                    <IoCartOutline className='w-5 h-5'/>
                </div>
            </Link>

            <ButtonMenu/>
        </div>
    </nav>
  )
}
