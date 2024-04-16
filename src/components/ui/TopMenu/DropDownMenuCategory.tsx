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
        const dropdown = document.querySelector('#dropdowncategory')
        dropdown?.classList.remove('hidden')
        dropdown?.classList.add('flex')
    }
    const handleDropdownHideMenu = (e:MouseEvent) => {
        const dropdown = document.querySelector('#dropdowncategory') as HTMLElement
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
        className='m-2 p-2 rounded-md transition-all flex items-center gap-x-2 hover:bg-gray-100' href="/products">Productos<IoArrowDownSharp size={10}/></Link>
        <div onMouseOut={handleDropdownHideMenu}  id='dropdowncategory' className={`${isDropdownOpen ? 'flex' : 'hidden'} p-2 rounded-md z-10 absolute left-2 gap-y-2 top-[3rem] bg-white  flex-col`}>
            <Link href="/category/oversizes" className='hover:bg-slate-100 p-3 rounded'>Oversizes</Link>
            <Link href="/category/shirts" className='hover:bg-slate-100 p-3 rounded'>Remeras</Link>
            <Link href="/category/hoodies" className='hover:bg-slate-100 p-3 rounded'>Buzos</Link>
            <Link href="/category/pants" className='hover:bg-slate-100 p-3 rounded'>Pantalones</Link>
            <Link href="/category/hats" className='hover:bg-slate-100 p-3 rounded'>Gorros</Link>
        </div>
    </div>
  )
}
