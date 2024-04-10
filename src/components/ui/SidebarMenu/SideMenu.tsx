'use client';
import { useUIStore } from '@/store/ui/ui';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const SideMenu = () => {
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeSideMenu = useUIStore(state => state.closeSideMenu);
  return (
    <div>
        {/* Black background */}
        {
            isSideMenuOpen && (
            <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'/> 
            )
        }

        {/* Bluer backgroud */}
        {
            isSideMenuOpen && (
                <div onClick={closeSideMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'/> 
            )
        }

        {/* Side Menu */}
        <nav 
        className={
            clsx(
                'fixed p-5 right-0 top-0 w-[260px] md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                {
                    /* efecto fade X */
                    "translate-x-full": !isSideMenuOpen
                }
            )
        }>
            {/* Close button */}
            <IoCloseOutline size={50} className='absolute top-5 right-5 cursor-pointer'
            onClick={closeSideMenu}/>

            {/* Search input */}
            <div className='relative mt-14 '>
                <IoSearchOutline size={20} className='absolute top-2 left-2'/>
                <input type="text" 
                placeholder='Buscar'
                className='w-full bg-gray-50 rounded pl-10 py-2 pr-10 border-b-2 text-xl border-gray-200 focus:otuline-none'/>
            </div>

            {/* Menu Options */}
            <Link href='/' className='flex items-center mt-10 p-2 py-4 hover:bg-gray-100 rounded transition-all'>
                <IoPersonOutline size={30}/>
                <span className='ml-3 text-xl'>Perfil</span>
            </Link>
            <Link href='/orders' className='flex items-center mt-10 p-2 py-4 hover:bg-gray-100 rounded transition-all'>
                <IoTicketOutline size={30}/>
                <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
            <Link href='#' className='flex items-center mt-10 p-2 py-4 hover:bg-gray-100 rounded transition-all'>
                <IoLogInOutline size={30}/>
                <span className='ml-3 text-xl'>Ingresar</span>
            </Link>
            <Link href='#' className='flex items-center mt-10 p-2 py-4 hover:bg-gray-100 rounded transition-all'>
                <IoLogOutOutline size={30}/>
                <span className='ml-3 text-xl'>Salir</span>
            </Link>

            {/* Line Separator */}
            <div className='w-full h-px bg-gray-200 my-10'></div>

            <Link href='#' className='flex items-center mt-10 p-2 py-4 hover:bg-gray-100 rounded transition-all'>
                <IoShirtOutline size={30}/>
                <span className='ml-3 text-xl'>Productos</span>
            </Link>
            <Link href='#' className='flex items-center mt-10 p-2 py-4 hover:bg-gray-100 rounded transition-all'>
                <IoTicketOutline size={30}/>
                <span className='ml-3 text-xl'>Orders</span>
            </Link>
            <Link href='#' className='flex items-center mt-10 p-2 py-4 hover:bg-gray-100 rounded transition-all'>
                <IoPeopleOutline size={30}/>
                <span className='ml-3 text-xl'>Clientes</span>
            </Link>
        </nav>
    </div>
  )
}
