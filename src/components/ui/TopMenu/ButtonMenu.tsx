'use client';
import { useUIStore } from '@/store/ui/ui'
import React from 'react'

export default function ButtonMenu() {
    const openSideMenu = useUIStore(state => state.openSideMenu)
  return (
    <button onClick={openSideMenu} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                Menu
    </button>
  )
}
