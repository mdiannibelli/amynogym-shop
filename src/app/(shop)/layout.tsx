
import { SideMenu } from '@/components/ui/SidebarMenu/SideMenu'
import Announcement from '@/components/ui/TopMenu/Announcement'
import TopMenu from '@/components/ui/TopMenu/TopMenu'
import React from 'react'

export default function ShopLayout({children}: {children:React.ReactNode}) {
  return (
    <main className='min-h-screen'>
        <Announcement/>
        <TopMenu/>
        <SideMenu/>
        <div className='px-4 items-center'>
        {children}
        </div>
    </main>
  )
}
