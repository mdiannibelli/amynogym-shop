'use client';
import Link from 'next/link';
import React, { MouseEvent, useState } from 'react'
import {IoArrowDownSharp } from 'react-icons/io5';

export default function DropdownMenu() {
    //! Tablet Devices onClick menu toggle.
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    //! Desktop Devices
    const handleDropdownMenu = () => {
        const dropdown = document.querySelector('#dropdown')
        dropdown?.classList.remove('hidden')
        dropdown?.classList.add('flex')
    }
    const handleDropdownHideMenu = (e:MouseEvent) => {
        const dropdown = document.querySelector('#dropdown') as HTMLElement
        //  e.relatedTarget => Indica el elemento hacia el cual el mouse se ha movido desde el elemento actual.
        // e.toElement => Idem pero se usa principalmente en navegadores más antiguos y no está presente en todos los navegadores modernos.
        const relatedTarget = e.relatedTarget as HTMLElement
        if(!dropdown?.contains(relatedTarget)) {
            dropdown?.classList.add('hidden')
        }
    }
  return (
    <div className='relative'>
        <Link 
        onMouseOut={handleDropdownMenu} 
        onClick={handleDropdownToggle}
        className='m-2 p-2 rounded-md transition-all flex items-center gap-x-2 hover:bg-gray-100' href="/products">Género<IoArrowDownSharp size={10}/></Link>
        <div onMouseOut={handleDropdownHideMenu}  id='dropdown' className={`${isDropdownOpen ? 'flex' : 'hidden'} p-2 rounded-md z-10 absolute left-0 gap-y-2 top-[3rem] bg-white  flex-col`}>
            <Link href="/products/gender/men" className='hover:bg-slate-100 p-3 rounded'>Hombre</Link>
            <Link href="/products/gender/women" className='hover:bg-slate-100 p-3 rounded'>Mujer</Link>
        </div>
    </div>
  )
}
